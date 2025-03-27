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

const formatDueDate = (dateString: string | null | undefined) => {
  if (!dateString) return "No due date";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

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
                <strong>Created By:</strong> {task.createdBy} | 
                <strong> Assigned To:</strong> {task.assignedTo}
              </p>
              {task.dueDate && (
                <p className="has-text-grey">
                  <strong>Due:</strong> {formatDueDate(task.dueDate)}
                </p>
              )}
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
          task={{ ...task, assignedTo: String(task.assignedTo) }}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

export default DraggableTask;
