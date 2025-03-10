import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import { PrismaService } from '../../../prisma.service';
import { ReqLoginDto } from '../dtos/req.login.dto';
import { ReqSignupDto } from '../dtos/req.signup.dto';
import { ResSignupDto } from '../dtos/res.signup.dto';

@Injectable()
export class AuthService {
  private readonly resend: Resend;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async signup({ email, password, name }: ReqSignupDto): Promise<ResSignupDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name.trim(),
        role: Role.MEMBER,
      },
    });

    const token = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      { expiresIn: '7d' },
    );

    return {
      message: 'Signup successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async login({ email, password }: ReqLoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      { expiresIn: '7d' },
    );

    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async resetPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = await this.jwtService.signAsync(
      { userId: user.id },
      { expiresIn: '1h' },
    );

    await this.prisma.user.update({
      where: { email },
      data: { resetToken },
    });

    const resetLink = `http://localhost:3000/auth/reset-password?token=${resetToken}`;

    try {
      const response = await this.resend.emails.send({
        from: 'taskman@resend.dev',
        to: email,
        subject: 'Password Reset Request',
        html: `<p>Hi ${user.name},</p><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
      });

      console.log('Resend Response:', response);
      return { message: 'Password reset link sent!' };
    } catch (error) {
      console.error('Resend Error:', error);
      throw new InternalServerErrorException(
        'Failed to send email. Please try again later.',
      );
    }
  }
}
