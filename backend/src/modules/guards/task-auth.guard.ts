import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TaskAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any): any {
    if (err || !user) {
      console.error('JWT Error:', err || 'Unauthorized Access');
      throw new UnauthorizedException('Unauthorized access');
    }
    return user;
  }
}
