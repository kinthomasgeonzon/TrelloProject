import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { Status } from '@prisma/client';
import { Request } from 'express';
import { TaskAuthGuard } from '../../guards/task-auth.guard';
import { CreateTaskDto } from '../dto/req.create-task.dto';
import { EditTaskDto } from '../dto/req.edittasks.dto';
import { UpdateTaskDto } from '../dto/req.updatetask.dto';
import { TaskService } from '../services/task.service';

interface AuthenticatedRequest extends Request {
  user: {
    role: string;
    id: number;
  };
}

@Controller('tasks')
@UseGuards(TaskAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Patch(':id')
  async editTask(@Param('id', ParseIntPipe) id: number, @Body() dto: EditTaskDto) {
    return await this.taskService.editTask(id, dto);
  }

  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateTaskDto) {
    const user = req.user;
    return await this.taskService.createTask({ ...dto, createdBy: user.id });
  }

  @Get()
  async getAllTasks(
    @Req() req: AuthenticatedRequest,
    @Query('status') status?: string,
    @Query('createdBy') createdBy?: string,
    @Query('assignedTo') assignedTo?: string,
  ) {
    const user = req.user;

    if (user.role !== 'ADMIN' && user.role !== 'MEMBER') {
      throw new ForbiddenException('Access denied: Insufficient permissions.');
    }

    const where: any = { deletedAt: null };

    if (status && status !== 'ALL' && Object.values(Status).includes(status as Status)) {
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

  @Post(':id/status')
  async updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTaskStatus(id, updateTaskDto.status);
  }

  @Patch(':id/task-order')
  async updateTaskOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body('taskOrder', ParseIntPipe) taskOrder: number,
  ) {
    return this.taskService.updateTaskOrder(id, taskOrder);
  }

}
