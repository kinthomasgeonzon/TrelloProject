"use client";

import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import styles from "../styles/kanban.module.css";
import DeleteTaskButton from "./DeleteTask";
import EditTaskForm from "./EditTaskForm";

interface DraggableTaskProps {
  task: {
    id: number;
    title: string;
    description?: string;
    createdBy: number;
    assignedTo: number;
    status: string;
    dueDate?: string;
    taskOrder: number;
    createdAt: string;
  };
  index: number;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({ task, index }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
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
              <DeleteTaskButton taskId={task.id} />
            </header>

            <div className="card-content">
              <p>{task.description}</p>
              <p className="has-text-grey">
                Created By: {task.createdBy} | Assigned To: {task.assignedTo}
              </p>
              {task.dueDate && <p className="has-text-grey">Due: {task.dueDate}</p>}
            </div>

            <footer className="card-footer">
              <button
                className="card-footer-item button is-small is-info"
                onClick={() => setIsEditOpen(true)}
              >
                Edit
              </button>
            </footer>
          </div>
        )}
      </Draggable>

      {isEditOpen && (
        <EditTaskForm
          task={task}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          closeModal={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

export default DraggableTask;
