import { Body, Controller, Post } from '@nestjs/common';
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
}
