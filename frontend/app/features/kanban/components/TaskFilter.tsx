"use client";

import { UseFormRegister } from "react-hook-form";
import { Task, TaskFilters } from "../utils/filterTasks";

interface TaskFilterProps {
  register: UseFormRegister<TaskFilters>;
  tasks: Task[];
}

const TaskFilter: React.FC<TaskFilterProps> = ({ register, tasks }) => {
  const uniqueCreators = [...new Set(tasks.map((task) => task.createdBy))];
  const uniqueAssignees = [...new Set(tasks.map((task) => task.assignedTo))];

  return (
    <div className="field has-text-centered my-4">
      <div className="columns is-multiline is-centered">
        <div className="column is-one-fifth">
          <label className="label" htmlFor="status">Filter by Status:</label>
          <div className="select is-primary">
            <select id="status" {...register("status")}>
              <option value="ALL">All</option>
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        </div>

        <div className="column is-one-fifth">
          <label className="label" htmlFor="createdBy">Filter by Created By:</label>
          <div className="select is-link">
            <select id="createdBy" {...register("createdBy")}>
              <option value="ALL">All</option>
              {uniqueCreators.length > 0 ? (
                uniqueCreators.map((creator) => (
                  <option key={creator} value={creator}>{creator}</option>
                ))
              ) : (
                <option disabled>No creators found</option>
              )}
            </select>
          </div>
        </div>

        <div className="column is-one-fifth">
          <label className="label" htmlFor="assignedTo">Filter by Assigned To:</label>
          <div className="select is-info">
            <select id="assignedTo" {...register("assignedTo")}>
              <option value="ALL">All</option>
              {uniqueAssignees.length > 0 ? (
                uniqueAssignees.map((assignee) => (
                  <option key={assignee} value={assignee}>{assignee}</option>
                ))
              ) : (
                <option disabled>No assignees found</option>
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
