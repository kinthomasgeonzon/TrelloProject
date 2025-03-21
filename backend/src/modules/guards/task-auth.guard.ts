import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';

@Injectable()
export class TaskAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: { role: Role } | null): any {
    if (err || !user) {
      throw new UnauthorizedException('Unauthorized access');
    }
    
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied: Admins only');
    }

    return user;
  }
}
