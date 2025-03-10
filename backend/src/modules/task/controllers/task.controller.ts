import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from '../dto/req.create-task.dto';
import { TaskService } from '../services/task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }
}
