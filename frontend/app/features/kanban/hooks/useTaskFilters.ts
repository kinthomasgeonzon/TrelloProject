import { useGetAllTasksQuery } from "@store/api/taskSlice";
import { useForm } from "react-hook-form";

export interface TaskFilters {
  status: string;
  createdBy: string;
  assignedTo: string;
}

const DEFAULT_FILTERS: TaskFilters = {
  status: "ALL",
  createdBy: "ALL",
  assignedTo: "ALL",
};

export const useTaskFilters = () => {
  const { register, watch, setValue } = useForm<TaskFilters>({
    defaultValues: DEFAULT_FILTERS,
  });

  const filters = watch();

  const { data: tasksData } = useGetAllTasksQuery({});
  const tasks = Array.isArray(tasksData) ? tasksData : [];

  return {
    register,
    filters,
    setValue,
    resetFilters: () => {
      Object.entries(DEFAULT_FILTERS).forEach(([key, value]) =>
        setValue(key as keyof TaskFilters, value)
      );
    },
    uniqueCreators: [...new Set(tasks.map((task) => task.createdBy))],
    uniqueAssignees: [...new Set(tasks.map((task) => task.assignedTo))],
  };
};
