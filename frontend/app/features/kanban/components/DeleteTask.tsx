"use client";

import { useDeleteTaskMutation } from "@store/api/taskSlice";
import styles from "../styles/deleteTaskButton.module.css";

interface DeleteTaskButtonProps {
  taskId: number;
}

const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({ taskId }) => {
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isLoading} 
      className={`${styles["delete-button"]} delete is-small`}
      aria-label="Delete Task"
    >
    </button>
  );
};

export default DeleteTaskButton;
