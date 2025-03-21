"use client";

import Modal from "../../../components/modal/Modal";
import { useEditTaskForm } from "../hooks/useEditTaskForm";
import { Task } from "../utils/filterTasks";

interface EditTaskFormProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  closeModal: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const { register, handleSubmit, errors, isLoading, onSubmit } =
    useEditTaskForm(task, onClose);

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Title</label>
          <input className="input" {...register("title", { required: true })} />
          {errors.title && <p className="help is-danger">Title is required</p>}
        </div>

        <div className="field">
          <label className="label">Description</label>
          <textarea className="textarea" {...register("description")} />
        </div>

        <div className="field">
          <label className="label">Status</label>
          <div className="select">
            <select {...register("status")}>
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label className="label">Assigned To</label>
          <input className="input" type="number" {...register("assignedTo")} />
        </div>

        <div className="field">
          <label className="label">Due Date</label>
          <input className="input" type="date" {...register("dueDate")} />
        </div>

        <button
          className="button is-primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </Modal>
  );
};

export default EditTaskForm;
