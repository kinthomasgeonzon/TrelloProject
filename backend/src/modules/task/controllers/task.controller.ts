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
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Request } from 'express';
import { TaskAuthGuard } from '../../guards/task-auth.guard';
import { CreateTaskDto } from '../dto/req.create-task.dto';
import { EditTaskDto } from '../dto/req.edittasks.dto';
import { TaskFilterDto } from '../dto/req.task-filter.dto';
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
    return await this.taskService.createTask({ ...dto, createdBy: req.user.id });
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllTasks(@Query() filterDto: TaskFilterDto) {
    return await this.taskService.getAllTasks(filterDto);
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
