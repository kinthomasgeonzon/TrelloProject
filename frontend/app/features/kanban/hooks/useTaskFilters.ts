import { useEffect, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
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

  const filters: TaskFilters = {
    status: activeFilters.status ?? "ALL",
    createdBy: activeFilters.createdBy ?? "ALL",
    assignedTo: activeFilters.assignedTo ?? "ALL",
  };

  useEffect(() => {
    const subscription = watch((values) => {
      setActiveFilters(
        Object.fromEntries(Object.entries(values).filter(([_, value]) => value !== "ALL"))
      );
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return {
    register: register as UseFormRegister<TaskFilters>,
    filters,
  };
};
