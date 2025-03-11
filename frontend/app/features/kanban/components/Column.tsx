import React from 'react';
import styles from '../styles/kanban.module.css';
import Task from './Task';

interface ColumnProps {
  title: string;
  tasks: { id: string; title: string }[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <div className={styles.column}>
      <h2>{title}</h2>
      {tasks.map((task) => (
        <Task key={task.id} title={task.title} />
      ))}
    </div>
  );
};

export default Column;