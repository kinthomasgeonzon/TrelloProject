export class ResCreateTaskDto {
  message!: string;
  task!: {
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
  };
}
