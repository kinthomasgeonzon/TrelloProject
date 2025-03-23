import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTaskMutation } from "@store/api/taskSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TaskSchema, taskSchema } from "../schemas/taskSchema";

export function useCreateTaskForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [userId, setUserId] = useState<number | null>(null);

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
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
        status: "TODO",
        createdBy: userId,
        taskOrder: 1, //default
      }).unwrap();

      reset();
      setIsOpen(false);
    } catch (err) {
      console.error("Error creating task", err);
    }finally {
      reset();
      setIsOpen(false);
    }
  };

  return { register, handleSubmit, onSubmit, errors, isLoading, isOpen, setIsOpen };
}
