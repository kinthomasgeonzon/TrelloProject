import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTaskMutation } from "@store/api/taskSlice";
import { useGetAllUsersQuery } from "@store/api/userSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TaskSchema, taskSchema } from "../schemas/taskSchema";

export function useCreateTaskForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [userId, setUserId] = useState<number | null>(null);
  const { data: users = [], isLoading: isUsersLoading, error } = useGetAllUsersQuery();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId ? Number(storedUserId) : null);
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskSchema) => {
    if (!userId) {
      alert("Session expired. Please log in again.");
      return;
    }

    try {
      await createTask({
        ...data,
        assignedTo: data.assignedTo ? Number(data.assignedTo) : null,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
        status: "TODO",
        createdBy: userId,
        taskOrder: 1, // Default
      }).unwrap();
    } catch (err) {
      console.error("Failed to create task", err);
    } finally {
      reset();
      setIsOpen(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isUsersLoading,
    users,
    isOpen,
    setIsOpen,
  };
}
