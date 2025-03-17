import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { EditTaskDto } from '../dto/req.edittasks.dto';
import { ResEditTaskDto } from '../dto/res.edittask.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async editTask(id: number, dto: EditTaskDto): Promise<ResEditTaskDto> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updatedTask = await this.prisma.task.update({
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
      task: updatedTask,
    };
  }
}
