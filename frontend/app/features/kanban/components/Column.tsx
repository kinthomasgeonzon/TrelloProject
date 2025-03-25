"use client";

import { Droppable } from "@hello-pangea/dnd";
import styles from "../styles/kanban.module.css";
import DeleteTaskButton from "./DeleteTask";

interface DroppableColumnProps {
  status: string;
  tasks: {
    id: number;
    title: string;
    description?: string;
    createdBy: string;
    assignedTo: string;
    status: string;
  }[];
  isLoading?: boolean;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ status, tasks, isLoading }) => {
  const filteredTasks = tasks
    .filter((task) => task.status === status)
    .map((task) => ({
      ...task,
      id: Number(task.id),
    }));

  return (
    <div className="column is-one-third">
      <h3 className="title is-4 has-text-centered">{status.replace("_", " ")}</h3>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`box has-background-light p-3 ${snapshot.isDraggingOver ? styles.draggingOver : ""}`}
          >
            {isLoading ? (
              <p className="has-text-centered has-text-grey-light">Loading tasks...</p>
            ) : filteredTasks.length === 0 ? (
              <p className="has-text-centered has-text-grey-light">No tasks available.</p>
            ) : (
              filteredTasks.map((task, index) => (
                <div key={task.id} className="card mb-3">
                  <header className="card-header">
                    <p className="card-header-title">{task.title}</p>
                    <DeleteTaskButton taskId={task.id} />
                  </header>
                  <div className="card-content">
                    <p>{task.description}</p>
                    <p className="has-text-grey">
                      Created By: {task.createdBy} | Assigned To: {task.assignedTo}
                    </p>
                  </div>
                </div>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DroppableColumn;
