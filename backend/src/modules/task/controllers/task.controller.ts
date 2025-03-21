import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Status } from '@prisma/client';
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
  async getAllTasks(
    @Query('status') status?: string, 
    @Query('createdBy') createdBy?: string,
    @Query('assignedTo') assignedTo?: string,
  ) {
    const where: any = { deletedAt: null };

    if (
      status &&
      status !== 'ALL' &&
      Object.values(Status).includes(status as Status)
    ) {
      where.status = status as Status;
    }

    if (createdBy) {
      const createdByInt = parseInt(createdBy, 10);
      if (!isNaN(createdByInt)) where.createdBy = createdByInt;
    }
    if (assignedTo) {
      const assignedToInt = parseInt(assignedTo, 10);
      if (!isNaN(assignedToInt)) where.assignedTo = assignedToInt;
    }

    const tasks = await this.taskService.getAllTasks(where);

    return {
      message: 'All tasks retrieved successfully',
      tasks,
    };
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.deleteTask(id);
  }
}
