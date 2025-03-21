import { zodResolver } from "@hookform/resolvers/zod";
import { useEditTaskMutation } from "@store/api/taskSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TaskSchema, taskSchema } from "../schemas/taskSchema";
import { Task } from "../utils/filterTasks";

export function useEditTaskForm(task: Task, onClose: () => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [editTask, { isLoading }] = useEditTaskMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      taskOrder: task.taskOrder,
      description: task.description,
      assignedTo: task.assignedTo ? Number(task.assignedTo) : 0,
      status: task.status || "TODO", 
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    },
  });

  const onSubmit = async (data: TaskSchema) => {
    try {
      await editTask({
        id: task.id,
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
      }).unwrap();

      reset();
      setIsOpen(false);
      onClose();
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isOpen,
    setIsOpen,
  };
}
