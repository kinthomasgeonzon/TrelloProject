import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: { id: number }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException('Invalid role assigned to user.');
    }
    return user;
  }
}
