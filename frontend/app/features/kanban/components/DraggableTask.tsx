"use client";

import { Draggable } from "@hello-pangea/dnd";
import styles from "../styles/kanban.module.css";

interface DraggableTaskProps {
  task: {
    id: number;
    title: string;
    description?: string;
    createdBy: string;
    assignedTo: string;
  };
  index: number;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({ task, index }) => {
  return (
    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`card mb-3 ${snapshot.isDragging ? styles.dragging : ""}`}
        >
          <header className="card-header">
            <p className="card-header-title">{task.title}</p>
          </header>
          <div className="card-content">
            <p>{task.description}</p>
            <p className="has-text-grey">
              Created By: {task.createdBy} | Assigned To: {task.assignedTo}
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableTask;
