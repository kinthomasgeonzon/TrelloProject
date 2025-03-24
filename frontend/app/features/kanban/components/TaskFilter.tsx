"use client";

import Button from "@/app/components/button/Button";
import { SubmitHandler, UseFormRegister } from "react-hook-form";
import { TaskFilters } from "../hooks/useTaskFilters";

interface TaskFilterProps {
  register: UseFormRegister<TaskFilters>;
  handleSubmit: (callback: SubmitHandler<TaskFilters>) => (event: React.FormEvent<HTMLFormElement>) => void;
  applyFilters: SubmitHandler<TaskFilters>;
  resetFilters: () => void;
  uniqueCreators: { id: number; name: string }[];
  uniqueAssignees: { id: number; name: string }[];
}

const TaskFilter: React.FC<TaskFilterProps> = ({ register, handleSubmit, applyFilters, resetFilters, uniqueCreators, uniqueAssignees }) => {
  return (
    <form onSubmit={handleSubmit(applyFilters)}>
      <div className="field has-text-centered my-4">
        <div className="columns is-multiline is-centered">
          <div className="column is-one-fifth">
            <label className="label">Filter by Status:</label>
            <div className="select is-primary">
              <select {...register("status")}>
                <option value="ALL">All</option>
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </div>
          </div>

          <div className="column is-one-fifth">
            <label className="label">Filter by Created By:</label>
            <div className="select is-link">
              <select {...register("createdBy")}>
                <option value="ALL">All</option>
                {uniqueCreators.length > 0 ? (
                  uniqueCreators.map((creator) => (
                    <option key={creator.id} value={String(creator.id)}>
                      {creator.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No creators found</option>
                )}
              </select>
            </div>
          </div>

          <div className="column is-one-fifth">
            <label className="label">Filter by Assigned To:</label>
            <div className="select is-info">
              <select {...register("assignedTo")}>
                <option value="ALL">All</option>
                {uniqueAssignees.length > 0 ? (
                  uniqueAssignees.map((assignee) => (
                    <option key={assignee.id} value={String(assignee.id)}>
                      {assignee.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No assignees found</option>
                )}
              </select>
            </div>
          </div>
        </div>

        <Button type="submit" className="button is-primary is-medium mx-2">
          Apply Filters
        </Button>

        <Button type="button" className="button is-light is-medium mx-2" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </form>
  );
};

export default TaskFilter;
