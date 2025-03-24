"use client";

import { useGetAllTasksQuery } from "@store/api/taskSlice";
import { useTaskFilters } from "../hooks/useTaskFilters";
import styles from "../styles/kanban.module.css";
import CreateTaskForm from "./CreateTaskForm";
import TaskFilter from "./TaskFilter";

const KanbanBoard: React.FC = () => {
  const { register, setValue, filters, resetFilters, uniqueCreators, uniqueAssignees } = useTaskFilters();
  const { data: tasksData, error, isLoading } = useGetAllTasksQuery(filters);

  const tasks = Array.isArray(tasksData) ? tasksData : [];

  if (isLoading) return <p className="notification is-info">Loading tasks...</p>;
  if (error) return <p className="notification is-danger">Error loading tasks.</p>;

  return (
    <div className={styles.kanbanContainer}>
      <div className={styles.sidebar}>
        <CreateTaskForm />
      </div>

      <TaskFilter
        register={register}
        setValue={setValue}
        resetFilters={resetFilters}
        uniqueCreators={uniqueCreators}
        uniqueAssignees={uniqueAssignees}
      />

      <div className={`${styles.kanbanBoard} columns is-variable is-4`}>
        {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
          <div key={status} className="column is-one-third">
            <h3 className="title is-4 has-text-centered">{status.replace("_", " ")}</h3>
            <div className="box has-background-light p-3">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div key={task.id} className="card mb-3">
                    <header className="card-header">
                      <p className="card-header-title">{task.title}</p>
                    </header>
                    <div className="card-content">
                      <p>{task.description}</p>
                      <p className="has-text-grey">
                        Created By: {task.createdBy?.name || "Unknown"} | 
                        Assigned To: {task.assignedTo?.name || "Unassigned"}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
