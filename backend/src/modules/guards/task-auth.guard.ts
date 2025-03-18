import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';


interface User {
  role: Role;
}

@Injectable()
export class TaskAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: User): any {
    if (err || !user) {
      console.error('JWT Error:', err || 'Unauthorized Access');
      throw new UnauthorizedException('Unauthorized access');
    }

    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException('Access restricted to ADMIN users.');
    }

    return user;
  }
}
