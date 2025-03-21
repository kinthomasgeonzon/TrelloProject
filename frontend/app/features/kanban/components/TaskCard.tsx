import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import EditTaskForm from "./EditTaskForm";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    createdBy: string;
    assignedTo: string;
    status: string;
    createdAt: string;
    taskOrder: any;
  };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="card mb-3">
      <header className="card-header">
        <p className="card-header-title">{task.title}</p>
      </header>
      <div className="card-content">
        <p>{task.description}</p>
        <p className="has-text-grey-light">
          Due Date: {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p className="has-text-grey">
          Created By: {task.createdBy} | Assigned To: {task.assignedTo}
        </p>
      </div>
      <footer className="card-footer">
        <button
          className="card-footer-item button is-small is-info"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      </footer>

      {isEditing && (
        <Modal onClose={() => setIsEditing(false)} isOpen={isEditing}>
          <EditTaskForm
            task={task}
            isOpen={isEditing}
            onClose={() => setIsEditing(false)}
            closeModal={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default TaskCard;
