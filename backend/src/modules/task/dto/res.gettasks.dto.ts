export class ResGetAllTasksDto {
  message!: string;
  tasks!: {
    id: number;
    title: string;
    description?: string | null;
    dueDate?: Date | null;
    status: string;
    taskOrder: number;
    createdBy: number;
    assignedTo?: number | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }[];
}
