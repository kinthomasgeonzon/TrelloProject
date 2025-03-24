import { useGetAllTasksQuery } from "@store/api/taskSlice";
import { useGetAllUsersQuery } from "@store/api/userSlice";
import { useState } from "react";
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

  const [filters, setFilters] = useState<TaskFilters>({
    status: "ALL",
    createdBy: "ALL",
    assignedTo: "ALL",
  });

  const { data: usersData } = useGetAllUsersQuery();
  const allUsers = Array.isArray(usersData) ? usersData : [];

  const applyFilters = (data: TaskFilters) => {
    setFilters(data);
  };

  const filteredQuery = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== "ALL" && value !== "")
  );

  const { data: tasksData } = useGetAllTasksQuery(filteredQuery);
  const tasks = Array.isArray(tasksData) ? tasksData : [];

  return {
    register,
    handleSubmit,
    applyFilters,
    filters,
    resetFilters: () => {
      reset();
      setFilters({
        status: "ALL",
        createdBy: "ALL",
        assignedTo: "ALL",
      });
    },
    uniqueCreators: allUsers,
    uniqueAssignees: allUsers,
    tasks,
  };
};

