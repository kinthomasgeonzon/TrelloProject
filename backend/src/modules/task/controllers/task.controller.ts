import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { TaskAuthGuard } from '../../guards/task-auth.guard';
import { EditTaskDto } from '../dto/req.edittasks.dto';
import { TaskService } from '../services/task.service';

@Controller('tasks')
@UseGuards(TaskAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Patch(':id')
  async editTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditTaskDto
  ) {
    return await this.taskService.editTask(id, dto);
  }
}
