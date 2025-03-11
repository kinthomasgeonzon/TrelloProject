"use client";

import KanbanBoard from "@features/kanban/components/KanbanBoard";
import styles from "@features/kanban/styles/kanban.module.css";

export default function KanbanPage() {
  return (
    <div className={styles.kanbanContainer}>
      <h1 className={styles.title}>TaskMan</h1>
      <KanbanBoard />
    </div>
  );
}
