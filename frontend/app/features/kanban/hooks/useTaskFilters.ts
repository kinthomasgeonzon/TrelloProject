import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TaskFilters } from "../utils/filterTasks";

export const useTaskFilters = () => {
  const { register, watch } = useForm<TaskFilters>({
    defaultValues: {
      status: "ALL",
      createdBy: "ALL",
      assignedTo: "ALL",
    },
  });

  const [activeFilters, setActiveFilters] = useState<Partial<TaskFilters>>({});

  useEffect(() => {
    const subscription = watch((values) => {
      setActiveFilters(
        Object.fromEntries(Object.entries(values).filter(([_, value]) => value !== "ALL"))
      );
    });

    return () => subscription.unsubscribe();
  }, []);

  const filters = {
    status: activeFilters.status ?? "ALL",
    createdBy: activeFilters.createdBy ?? "ALL",
    assignedTo: activeFilters.assignedTo ?? "ALL",
  };

  return {
    register,
    filters,
  };
};
