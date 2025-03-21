export interface Task {
    taskOrder: any;
    id: string;
    title: string;
    description: string;
    status: string;
    createdBy: string;
    assignedTo: string;
    dueDate: string;
    createdAt: string;
  }
  
  export interface TaskFilters {
    status: string;
    createdBy: string;
    assignedTo: string;
    dueDate: string;
    createdAt: string;
    createdAtOrder: "NEWEST" | "OLDEST";
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
    if (filters.dueDate !== "ALL") {
      filtered = filtered.filter((task) => task.dueDate === filters.dueDate);
    }
    if (filters.createdAt !== "ALL") {
      filtered = filtered.filter((task) => task.createdAt === filters.createdAt);
    }
  
    return filters.createdAtOrder === "NEWEST"
      ? filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      : filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  };
