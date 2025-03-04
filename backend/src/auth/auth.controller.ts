import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() body: { email: string; password: string; name?: string },
  ) {
    const user = await this.authService.signup(
      body.email,
      body.password,
      body.name
    );
    return { message: 'User registered successfully', user };
  }

}
