import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { CreateTaskDto } from '../dto/req.create-task.dto';
import { EditTaskDto } from '../dto/req.edittasks.dto';
import { ResCreateTaskDto } from '../dto/res.create-task.dto';
import { ResEditTaskDto } from '../dto/res.edittask.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(dto: CreateTaskDto): Promise<ResCreateTaskDto> {
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description || null,
        dueDate: dto.dueDate || null,
        status: Status.TODO,
        taskOrder: 0,
        createdBy: dto.createdBy,
      },
    });

    return {
      message: 'Task created successfully',
      task,
    };
  }

  async getAllTasks() {
    const tasks = await this.prisma.task.findMany();
    return {
      message: 'All tasks retrieved successfully',
      tasks,
    };
  }

  async editTask(id: number, dto: EditTaskDto): Promise<ResEditTaskDto> {
    const task = await this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description || null,
        dueDate: dto.dueDate || null,
        status: dto.status,
        assignedTo: dto.assignedTo || null,
        taskOrder: dto.taskOrder,
        updatedAt: new Date(),
      },
    });

    return {
      message: 'Task updated successfully',
      task,
    };
  }
}
