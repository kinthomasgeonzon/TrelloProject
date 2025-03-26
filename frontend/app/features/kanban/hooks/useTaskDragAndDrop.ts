import { DropResult } from "@hello-pangea/dnd";
import {
  useGetAllTasksQuery,
  useUpdateTaskOrderMutation,
  useUpdateTaskStatusMutation,
} from "@store/api/taskSlice";
import { useState } from "react";

export const useTaskDragAndDrop = () => {
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [updateTaskOrder] = useUpdateTaskOrderMutation();
  const { data: tasks } = useGetAllTasksQuery({});
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const taskId = Number(draggableId);
    const newStatus = destination.droppableId;

    setIsDragging(true);

    try {
      const promises = [];
      const columnTasks = tasks?.filter((task) => task.status === newStatus) || [];
      const updatedTasks = columnTasks.filter((task) => task.id !== taskId);
      updatedTasks.splice(destination.index, 0, { id: taskId, status: newStatus });

      const reorderedTasks = updatedTasks.map((task, index) => ({
        taskId: task.id,
        taskOrder: index + 1,
      }));

      promises.push(
        ...reorderedTasks.map((task) =>
          updateTaskOrder({ taskId: task.taskId, taskOrder: task.taskOrder }).unwrap()
        )
      );

      if (source.droppableId !== newStatus) {
        promises.push(updateTaskStatus({ taskId, newStatus }).unwrap());
      }

      await Promise.all(promises);
    } catch (err) {
    } finally {
      setIsDragging(false);
    }
  };

  return { onDragEnd, isDragging };
};
