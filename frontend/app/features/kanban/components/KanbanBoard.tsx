"use client";

import styles from "../styles/kanban.module.css";
import CreateTaskForm from "./CreateTaskForm";

const KanbanBoard: React.FC = () => {
  return (
    <div className={styles.kanbanContainer}>
      <div className={styles.sidebar}>
        <CreateTaskForm />
      </div>

      <div className={styles.kanbanBoard}>
        {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
          <div key={status} className={styles.column}>
            <h3 className={styles.columnTitle}>{status.replace("_", " ")}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
