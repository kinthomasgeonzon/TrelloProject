import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CreateTaskDto } from '../dto/req.create-task.dto';
import { ResCreateTaskDto } from '../dto/res.create-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(dto: CreateTaskDto): Promise<ResCreateTaskDto> {
    const task = await this.prisma.task.create({
      data: {
        ...dto,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      },
    });

    return {
      message: 'Task created successfully',
      task,
    };
  }
}
