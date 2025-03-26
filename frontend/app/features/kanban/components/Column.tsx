"use client";

import { Droppable } from "@hello-pangea/dnd";
import styles from "../styles/kanban.module.css";
import DraggableTask from "./DraggableTask";

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
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ status, tasks }) => {
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
            {filteredTasks.map((task, index) => (
              <DraggableTask key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default DroppableColumn;