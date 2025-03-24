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

  const { data: usersData } = useGetAllUsersQuery();
  const allUsers = Array.isArray(usersData) ? usersData : [];

  const [filters, setFilters] = useState<Record<string, string>>({});

  return {
    register,
    handleSubmit,
    applyFilters: () => {
      const newFilters = Object.fromEntries(
        Object.entries(getValues()).filter(([_, value]) => value !== "ALL" && value !== "")
      );
      setFilters(newFilters);
    },
    resetFilters: () => {
      reset();
      setFilters({});
    },
    uniqueCreators: allUsers,
    uniqueAssignees: allUsers,
    filters,
  };
};
