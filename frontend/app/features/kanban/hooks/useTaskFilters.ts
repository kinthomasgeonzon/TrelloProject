import { useGetAllTasksQuery } from "@store/api/taskSlice";
import { useGetAllUsersQuery } from "@store/api/userSlice";
import { useForm } from "react-hook-form";

export interface TaskFilters {
  status: string;
  createdBy: string;
  assignedTo: string;
}

export const useTaskFilters = () => {
  const { register, handleSubmit, reset, getValues } = useForm<TaskFilters>({
    defaultValues: {
      status: "ALL",
      createdBy: "ALL",
      assignedTo: "ALL",
    },
  });

  const { data: usersData } = useGetAllUsersQuery();
  const allUsers = Array.isArray(usersData) ? usersData : [];

  const getFilteredQuery = () =>
    Object.fromEntries(
      Object.entries(getValues()).filter(([_, value]) => value !== "ALL" && value !== "")
    );

  const { data: tasksData } = useGetAllTasksQuery(getFilteredQuery());

  return {
    register,
    handleSubmit,
    applyFilters: (data: TaskFilters) => {}, 
    resetFilters: () => reset(),
    uniqueCreators: allUsers,
    uniqueAssignees: allUsers,
    getFilteredQuery,
    tasks: Array.isArray(tasksData) ? tasksData : [],
  };
};
