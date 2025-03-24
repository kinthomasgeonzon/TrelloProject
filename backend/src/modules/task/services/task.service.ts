import { Injectable, NotFoundException } from "@nestjs/common";
import { Status } from "@prisma/client";
import { PrismaService } from "../../../prisma.service";
import { CreateTaskDto } from "../dto/req.create-task.dto";
import { EditTaskDto } from "../dto/req.edittasks.dto";
import { TaskFilterDto } from "../dto/req.task-filter.dto";
import { ResCreateTaskDto } from "../dto/res.create-task.dto";
import { ResEditTaskDto } from "../dto/res.edittask.dto";

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) { }

  async editTask(id: number, dto: EditTaskDto): Promise<ResEditTaskDto> {
    const task = await this.prisma.task.findUnique({
      where: { id, deletedAt: null },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found or deleted`);
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
      include: {
        creator: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true } },
      },
    });

    return {
      message: "Task updated successfully",
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
        assignedTo: dto.assignedTo ?? undefined,
        taskOrder: dto.taskOrder ?? 0,
        createdBy: dto.createdBy,
        updatedAt: new Date(),
        deletedAt: null,
      },
      include: {
        creator: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true } },
      },
    });

    return {
      message: "Task created successfully",
      task,
    };
  }

  async getAllTasks(filterDto: TaskFilterDto) {
    const where = this.buildTaskFilter(filterDto);
  
    const tasks = await this.prisma.task.findMany({
      where,
      orderBy: { taskOrder: "asc" },
      include: {
        creator: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true } },
      },
    });
  
    return {
      message: "Tasks retrieved successfully",
      tasks: tasks.map((task) => ({
        ...task,
        createdBy: task.creator ? task.creator.name : "Unknown",
        assignedTo: task.assignee ? task.assignee.name : "Unassigned",
      })),
    };
  }

  private buildTaskFilter(filterDto: TaskFilterDto) {
    const { status, createdBy, assignedTo } = filterDto;
    const where: any = { deletedAt: null };

    if (status && Object.values(Status).includes(status)) {
      where.status = status;
    }

    if (createdBy) {
      where.createdBy = createdBy;
    }

    if (assignedTo) {
      where.assignedTo = assignedTo;
    }

    return where;
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

    return { message: "Task soft deleted successfully" };
  }
}
