import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { TaskAuthGuard } from '../../guards/task-auth.guard';
import { CreateTaskDto } from '../dto/req.create-task.dto';
import { TaskService } from '../services/task.service';


interface AuthenticatedRequest extends Request {
  user: User; 
}

@Controller('tasks')
@UseGuards(TaskAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateTaskDto) {
    const user = req.user;
    console.log('Authenticated User:', user);
    return await this.taskService.createTask(dto);
  }
}
