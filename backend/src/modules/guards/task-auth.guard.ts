import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';

@Injectable()
export class TaskAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: { role: Role } | null): any {
    if (err || !user) {
      throw new UnauthorizedException('Unauthorized access');
    }

    // Check if the user has the appropriate role to access task-related operations
    if (user.role !== 'ADMIN' && user.role !== 'MEMBER') {
      throw new ForbiddenException('Access denied: Only Admins and Members are allowed');
    }

    return user;
  }
}
