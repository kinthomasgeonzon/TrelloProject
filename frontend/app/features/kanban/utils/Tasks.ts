export interface Task {
  taskOrder: number;
  id: number;
  title: string;
  description?: string;
  status: string;
  createdBy: number;
  assignedTo?: number | null;
  dueDate?: string | null;
  createdAt: string;
}
