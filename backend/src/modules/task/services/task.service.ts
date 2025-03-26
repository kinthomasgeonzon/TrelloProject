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
  constructor(private readonly prisma: PrismaService) {}

  async editTask(id: number, dto: EditTaskDto): Promise<ResEditTaskDto> {
    const task = await this.prisma.task.findUnique({
      where: { id, deletedAt: null },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found or has been deleted`);
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title ?? task.title,
        description: dto.description ?? task.description,
        dueDate: dto.dueDate ?? task.dueDate,
        status: dto.status ?? task.status,
        assignedTo: dto.assignedTo ?? task.assignedTo,
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
    const lastTask = await this.prisma.task.findFirst({
      where: { status: Status.TODO, deletedAt: null },
      orderBy: { taskOrder: 'desc' },
    });

    const newTaskOrder = lastTask ? lastTask.taskOrder + 1 : 1;

    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description ?? null,
        dueDate: dto.dueDate ?? null,
        status: Status.TODO,
        assignedTo: dto.assignedTo ?? null,
        taskOrder: newTaskOrder,
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

  async updateTaskStatus(id: number, newStatus: Status): Promise<ResEditTaskDto> {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found or already deleted`);
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        status: newStatus,
        updatedAt: new Date(),
      },
    });

    return {
      message: "Task status updated successfully",
      task: updatedTask,
    };
  }

  async updateTaskOrder(id: number, taskOrder: number) {
    const task = await this.prisma.task.findUnique({
      where: { id, deletedAt: null },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found or deleted`);
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: { taskOrder, updatedAt: new Date() },
    });

    return {
      message: "Task order updated successfully",
      task: updatedTask,
    };

  }
}
