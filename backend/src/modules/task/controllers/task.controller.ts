import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { TaskAuthGuard } from '../../guards/task-auth.guard';
import { CreateTaskDto } from '../dto/req.create-task.dto';
import { EditTaskDto } from '../dto/req.edittasks.dto';
import { TaskService } from '../services/task.service';

interface AuthenticatedRequest extends Request {
  user: { id: number };
}

@Controller('tasks')
@UseGuards(TaskAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Patch(':id')
  async editTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditTaskDto,
  ) {
    return await this.taskService.editTask(id, dto);
  }
  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateTaskDto) {
    const user = req.user;
    return await this.taskService.createTask({ ...dto, createdBy: user.id });
  }

  @Get()
  async getAll() {
    return await this.taskService.getAllTasks();
  }
}
