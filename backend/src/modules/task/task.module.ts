import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { TaskAuthGuard } from '../guards/task-auth.guard';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';

@Module({
 
  controllers: [TaskController],
  providers: [TaskService, PrismaService, TaskAuthGuard],
  exports: [TaskService, TaskAuthGuard],
})
export class TaskModule {}
