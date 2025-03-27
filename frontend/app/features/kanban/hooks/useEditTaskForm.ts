import { zodResolver } from "@hookform/resolvers/zod";
import { useEditTaskMutation } from "@store/api/taskSlice";
import { useGetAllUsersQuery } from "@store/api/userSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TaskSchema, taskSchema } from "../schemas/taskSchema";
import { Task } from "../utils/Tasks";

export function useEditTaskForm(task: Task, onClose: () => void) {
  const [editTask, { isLoading }] = useEditTaskMutation();
  const { data: users = [], isLoading: isUsersLoading } = useGetAllUsersQuery();
  const assignedUser = users.find((user) => user.id === Number(task.assignedTo));
  const assignedUserId = assignedUser ? String(assignedUser.id) : "";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      taskOrder: Number(task.taskOrder) || 0,
      description: task.description || "",
      assignedTo: assignedUserId,
      status: task.status || "TODO",
      dueDate: task.dueDate?.split("T")[0] || "",
    },
  });

  useEffect(() => {
    setValue("assignedTo", assignedUserId);
  }, [assignedUserId, setValue]);

  const onSubmit = async (data: TaskSchema) => {
    try {
      await editTask({
        id: task.id,
        ...data,
        assignedTo: data.assignedTo ? Number(data.assignedTo) : null,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
      }).unwrap();
    } catch (err) {
    } finally {
      reset();
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
    users,
    assignedUserId,
  };
}
