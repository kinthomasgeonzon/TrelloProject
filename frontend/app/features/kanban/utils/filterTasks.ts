export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  createdBy: string;
  assignedTo: string;
}

export interface TaskFilters {
  status: string;
  createdBy: string;
  assignedTo: string;
}

export const filterTasks = (tasks: Task[], filters: TaskFilters): Task[] => {
  let filtered = [...tasks];

  if (filters.status !== "ALL") {
    filtered = filtered.filter((task) => task.status === filters.status);
  }
  if (filters.createdBy !== "ALL") {
    filtered = filtered.filter((task) => String(task.createdBy) === filters.createdBy);
  }
  if (filters.assignedTo !== "ALL") {
    filtered = filtered.filter((task) => String(task.assignedTo) === filters.assignedTo);
  }

  return filtered;
};
