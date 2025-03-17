"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/kanban.module.css";
import CreateTaskForm from "./CreateTaskForm";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:4000/tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch tasks");

        const data = await response.json();
        setTasks(data.tasks); 
      } catch (error) {
        console.error(error);
        setTasks([]); 
      }
    })();
  }, []);

  return (
    <div className={styles.kanbanContainer}>
      <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
        <CreateTaskForm />
      </div>
      <div className={styles.kanbanBoard}>
        {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
          <div key={status} className={styles.column}>
            <h3 className={styles.columnTitle}>{status.replace("_", " ")}</h3>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div key={task.id} className={styles.taskCard}>
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
