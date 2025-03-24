import { useGetAllTasksQuery } from "@store/api/taskSlice";
import { useForm } from "react-hook-form";

export interface TaskFilters {
  status: string;
  createdBy: string;
  assignedTo: string;
}

export const useTaskFilters = () => {
  const { register, setValue, watch, reset } = useForm<TaskFilters>({
    defaultValues: {
      status: "ALL",
      createdBy: "ALL",
      assignedTo: "ALL",
    },
  });

  const { data: tasks } = useGetAllTasksQuery({}, {
    selectFromResult: ({ data }) => ({
      data: Array.isArray(data) ? data : [],
    }),
  });

  const uniqueCreators = [
    ...new Map(
      (tasks ?? [])
        .filter((task) => task.createdBy)
        .map((task) => [task.createdBy.id, { id: task.createdBy.id, name: task.createdBy.name }])
    ).values(),
  ];

  const uniqueAssignees = [
    ...new Map(
      (tasks ?? [])
        .filter((task) => task.assignedTo)
        .map((task) => [task.assignedTo.id, { id: task.assignedTo.id, name: task.assignedTo.name }])
    ).values(),
  ];

  return {
    register,
    setValue,
    filters: watch(),
    resetFilters: () => reset(),
    uniqueCreators,
    uniqueAssignees,
  };
};
