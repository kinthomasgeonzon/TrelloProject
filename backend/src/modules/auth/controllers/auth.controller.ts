import { Body, Controller, Post } from '@nestjs/common';
import { ReqLoginDto } from '../dtos/req.login.dto';
import { ReqResetPasswordDto } from '../dtos/req.reset-password.dto';
import { ReqSignupDto } from '../dtos/req.signup.dto';
import { ResSignupDto } from '../dtos/res.signup.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: ReqSignupDto): Promise<ResSignupDto> {
    return await this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: ReqLoginDto) {
    return await this.authService.login(body);
  }
  @Post('update-password')
  async updatePassword(@Body() body: ReqResetPasswordDto) {
    return await this.authService.updatePassword(body);
  }

  @Post('reset-password')
  async resetPassword(@Body('email') email: string) {
    return await this.authService.resetPassword(email);
  }
}
