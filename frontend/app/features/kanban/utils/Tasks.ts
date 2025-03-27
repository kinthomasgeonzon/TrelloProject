export interface Task {
  taskOrder: number;
  id: number;
  title: string;
  description?: string;
  status: string;
  createdBy: number;
  assignedTo?: string | null;
  dueDate?: string | null;
  createdAt: string;
}
