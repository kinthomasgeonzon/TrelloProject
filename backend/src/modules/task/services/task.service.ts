import { Injectable, NotFoundException } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { CreateTaskDto } from '../dto/req.create-task.dto';
import { EditTaskDto } from '../dto/req.edittasks.dto';
import { ResCreateTaskDto } from '../dto/res.create-task.dto';
import { ResEditTaskDto } from '../dto/res.edittask.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async editTask(id: number, dto: EditTaskDto): Promise<ResEditTaskDto> {
    const task = await this.prisma.task.findUnique({
      where: { id, deletedAt: null },
    });

    if (!task) {
      throw new NotFoundException(
        `Task with ID ${id} not found or has been deleted`,
      );
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title ?? task.title,
        description: dto.description ?? task.description,
        dueDate: dto.dueDate ?? task.dueDate,
        status: dto.status ?? task.status,
        assignedTo: dto.assignedTo ?? task.assignedTo,
        taskOrder: dto.taskOrder ?? task.taskOrder,
        updatedAt: new Date(),
      },
    });

    return {
      message: 'Task updated successfully',
      task: updatedTask,
    };
  }

  async createTask(dto: CreateTaskDto): Promise<ResCreateTaskDto> {
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description ?? null,
        dueDate: dto.dueDate ?? null,
        status: Status.TODO,
        assignedTo: dto.assignedTo ?? null,
        taskOrder: dto.taskOrder ?? 0,
        createdBy: dto.createdBy,
        updatedAt: new Date(),
        deletedAt: null,
      },
    });

    return {
      message: 'Task created successfully',
      task,
    };
  }

  async getAllTasks(where: any) {
    return await this.prisma.task.findMany({
      where: { ...where, deletedAt: null }, 
      orderBy: { createdAt: 'desc' }, 
    });
  }

  async deleteTask(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id, deletedAt: null },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found or already deleted`);
    }

    await this.prisma.task.update({
      where: { id },
      data: { deletedAt: new Date(), updatedAt: new Date() },
    });

    return { message: 'Task soft deleted successfully' };
  }
}
