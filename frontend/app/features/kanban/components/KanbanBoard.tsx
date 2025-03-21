"use client";

import { useGetAllTasksQuery } from "@store/api/taskSlice";
import { useState } from "react";
import styles from "../styles/kanban.module.css";
import { filterTasks, TaskFilters } from "../utils/filterTasks";
import CreateTaskForm from "./CreateTaskForm";
import TaskCard from "./TaskCard";
import TaskFilter from "./TaskFilter";

const KanbanBoard: React.FC = () => {
  const { data, error, isLoading } = useGetAllTasksQuery();
  const tasks = data?.tasks || [];

  const [filters, setFilters] = useState<TaskFilters>({
    status: "ALL",
    createdBy: "ALL",
    assignedTo: "ALL",
    dueDate: "ALL",
    createdAt: "ALL",
    createdAtOrder: "NEWEST",
  });

  if (isLoading)
    return <p className="notification is-info">Loading tasks...</p>;
  if (error) {
    console.error("Error loading tasks:", error);
    return <p className="notification is-danger">Error loading tasks.</p>;
  }

  const uniqueCreators = [...new Set(tasks.map((task) => task.createdBy))];
  const uniqueAssignees = [...new Set(tasks.map((task) => task.assignedTo))];
  const uniqueDueDates = [...new Set(tasks.map((task) => task.dueDate))];
  const uniqueCreatedAtDates = [...new Set(tasks.map((task) => task.createdAt))];

  const filteredTasks = filterTasks(tasks, filters);

  return (
    <div className={styles.kanbanContainer}>
      <div className={styles.sidebar}>
        <CreateTaskForm />
      </div>

      <TaskFilter
        uniqueCreators={uniqueCreators}
        uniqueAssignees={uniqueAssignees}
        uniqueDueDates={uniqueDueDates}
        uniqueCreatedAtDates={uniqueCreatedAtDates}
        onFilterChange={(newFilters) =>
          setFilters((prev) => ({ ...prev, ...newFilters }))
        }
      />

      <div className={`${styles.kanbanBoard} columns is-variable is-4`}>
        {["TODO", "IN_PROGRESS", "DONE"]
          .filter(
            (status) => filters.status === "ALL" || filters.status === status
          )
          .map((status) => (
            <div key={status} className="column is-one-third">
              <h3 className="title is-4 has-text-centered">
                {status.replace("_", " ")}
              </h3>
              <div className="box has-background-light p-3">
                {filteredTasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
