import { zodResolver } from "@hookform/resolvers/zod";
import { useEditTaskMutation } from "@store/api/taskSlice";
import { useGetAllUsersQuery } from "@store/api/userSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TaskSchema, taskSchema } from "../schemas/taskSchema";
import { Task } from "../utils/Tasks";

export function useEditTaskForm(task: Task, onClose: () => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [editTask, { isLoading }] = useEditTaskMutation();
  const { data: users = [], isLoading: isUsersLoading, error } = useGetAllUsersQuery();
  if (error) console.error("Error fetching users:", error);

  const assignedUser = users.find((user) => user.id === Number(task.assignedTo));
  const assignedUserId = assignedUser ? String(assignedUser.id) : "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      taskOrder: Number(task.taskOrder),
      description: task.description,
      assignedTo: assignedUserId,
      status: task.status || "TODO",
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    },
  });

  const onSubmit = async (data: TaskSchema) => {
    try {
      const assignedToId = data.assignedTo ? Number(data.assignedTo) : null;

      await editTask({
        id: task.id,
        ...data,
        assignedTo: assignedToId,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update task", err);
    } finally {
      reset();
      setIsOpen(false);
      onClose();
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isUsersLoading,
    isOpen,
    setIsOpen,
    users,
  };
}
