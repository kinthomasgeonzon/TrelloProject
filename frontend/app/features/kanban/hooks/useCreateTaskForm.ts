import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTaskMutation } from "@store/api/taskSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TaskSchema, taskSchema } from "../schemas/taskSchema";

export function useCreateTaskForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskSchema) => {
    try {
      await createTask({
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
        status: "TODO",
        createdBy: 1, //temporary
        taskOrder: 1, //temporary
      }).unwrap();
    } catch (err) {
    } finally {
      reset();
      setIsOpen(false);
    }
  };

  return { register, handleSubmit, onSubmit, errors, isLoading, isOpen, setIsOpen };
}
