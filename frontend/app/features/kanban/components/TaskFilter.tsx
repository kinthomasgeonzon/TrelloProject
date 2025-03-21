"use client";

import { useState } from "react";

interface TaskFilterProps {
  uniqueCreators: string[];
  uniqueAssignees: string[];
  uniqueDueDates: string[];
  uniqueCreatedAtDates: string[];
  onFilterChange: (filters: {
    status: string;
    createdBy: string;
    assignedTo: string;
    dueDate: string;
    createdAt: string;
  }) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  uniqueCreators,
  uniqueAssignees,
  uniqueDueDates,
  uniqueCreatedAtDates,
  onFilterChange,
}) => {
  const [status, setStatus] = useState<string>("ALL");
  const [createdBy, setCreatedBy] = useState<string>("ALL");
  const [assignedTo, setAssignedTo] = useState<string>("ALL");
  const [dueDate, setDueDate] = useState<string>("ALL");
  const [createdAt, setCreatedAt] = useState<string>("ALL");
  const [createdAtOrder, setCreatedAtOrder] = useState<"NEWEST" | "OLDEST">("NEWEST");

  const handleFilterChange = () => {
    onFilterChange({ status, createdBy, assignedTo, dueDate, createdAt});
  };

  return (
    <div className="field has-text-centered my-4">
      <div className="columns is-multiline is-centered">

        <div className="column is-one-fifth">
          <label className="label">Filter by Status:</label>
          <div className="select is-primary">
            <select
              aria-label="Filter by Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              onBlur={handleFilterChange}
            >
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
            <select
              aria-label="Filter by Created By"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              onBlur={handleFilterChange}
            >
              <option value="ALL">All</option>
              {uniqueCreators.map((creator) => (
                <option key={creator} value={creator}>
                  {creator}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="column is-one-fifth">
          <label className="label">Filter by Assigned To:</label>
          <div className="select is-info">
            <select
              aria-label="Filter by Assigned To"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              onBlur={handleFilterChange}
            >
              <option value="ALL">All</option>
              {uniqueAssignees.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="column is-one-fifth">
          <label className="label">Filter by Due Date:</label>
          <div className="select is-danger">
            <select
              aria-label="Filter by Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              onBlur={handleFilterChange}
            >
              <option value="ALL">All</option>
              {uniqueDueDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="column is-one-fifth">
          <label className="label">Filter by Created At:</label>
          <div className="select is-success">
            <select
              aria-label="Filter by Created At"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              onBlur={handleFilterChange}
            >
              <option value="ALL">All</option>
              {uniqueCreatedAtDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaskFilter;
