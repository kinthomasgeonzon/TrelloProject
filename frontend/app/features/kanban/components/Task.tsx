import React from 'react';
import styles from '../styles/kanban.module.css';

interface TaskProps {
  title: string;
}

const Task: React.FC<TaskProps> = ({ title }) => {
  return <div className={styles.task}>{title}</div>;
};

export default Task;
// placeholder for now
