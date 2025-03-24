"use client";

import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { TaskFilters } from "../hooks/useTaskFilters";

interface TaskFilterProps {
  register: UseFormRegister<TaskFilters>;
  setValue: UseFormSetValue<TaskFilters>;
  uniqueCreators: string[];
  uniqueAssignees: string[];
}

const TaskFilter: React.FC<TaskFilterProps> = ({ register, setValue, uniqueCreators, uniqueAssignees }) => {
  const handleFilterChange = (filter: keyof TaskFilters, value: string) => {
    setValue(filter, value);
  };

  return (
    <div className="field has-text-centered my-4">
      <div className="columns is-multiline is-centered">
        <div className="column is-one-fifth">
          <label className="label">Filter by Status:</label>
          <div className="select is-primary">
            <select {...register("status")} onChange={(e) => handleFilterChange("status", e.target.value)}>
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
            <select {...register("createdBy")} onChange={(e) => handleFilterChange("createdBy", e.target.value)}>
              <option value="ALL">All</option>
              {uniqueCreators.length > 0 ? uniqueCreators.map((creator) => (
                <option key={creator} value={creator}>{creator}</option>
              )) : <option disabled>No creators found</option>}
            </select>
          </div>
        </div>

        <div className="column is-one-fifth">
          <label className="label">Filter by Assigned To:</label>
          <div className="select is-info">
            <select {...register("assignedTo")} onChange={(e) => handleFilterChange("assignedTo", e.target.value)}>
              <option value="ALL">All</option>
              {uniqueAssignees.length > 0 ? uniqueAssignees.map((assignee) => (
                <option key={assignee} value={assignee}>{assignee}</option>
              )) : <option disabled>No assignees found</option>}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
