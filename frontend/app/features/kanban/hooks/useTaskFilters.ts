import { useGetAllTasksQuery } from "@store/api/taskSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export interface TaskFilters {
  status: string;
  createdBy: string;
  assignedTo: string;
}

export const useTaskFilters = () => {
  const { register, watch, setValue } = useForm<TaskFilters>({
    defaultValues: {
      status: "ALL",
      createdBy: "ALL",
      assignedTo: "ALL",
    },
  });

  const [activeFilters, setActiveFilters] = useState<TaskFilters>({
    status: "ALL",
    createdBy: "ALL",
    assignedTo: "ALL",
  });

  useEffect(() => {
    const subscription = watch((values) => {
      setActiveFilters({
        status: values.status || "ALL",
        createdBy: values.createdBy || "ALL",
        assignedTo: values.assignedTo || "ALL",
      });
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const { data: tasksData } = useGetAllTasksQuery({});
  const tasks = Array.isArray(tasksData) ? tasksData : [];

  return {
    register,
    filters: activeFilters,
    setValue,
    resetFilters: () => {
      setValue("status", "ALL");
      setValue("createdBy", "ALL");
      setValue("assignedTo", "ALL");
      setActiveFilters({
        status: "ALL",
        createdBy: "ALL",
        assignedTo: "ALL",
      });
    },
    uniqueCreators: [...new Set(tasks.map((task) => task.createdBy))],
    uniqueAssignees: [...new Set(tasks.map((task) => task.assignedTo))],
  };
};
