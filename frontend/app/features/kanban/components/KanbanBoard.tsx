"use client";

import { useGetAllTasksQuery } from "@store/api/taskSlice";
import { useTaskFilters } from "../hooks/useTaskFilters";
import styles from "../styles/kanban.module.css";
import { filterTasks } from "../utils/filterTasks";
import CreateTaskForm from "./CreateTaskForm";
import TaskFilter from "./TaskFilter";

const KanbanBoard: React.FC = () => {
  const { register, filters } = useTaskFilters();

  const { data, error, isLoading } = useGetAllTasksQuery(filters);
  const tasks = Array.isArray(data) ? data : [];

  if (isLoading) return <p className="notification is-info">Loading tasks...</p>;
  if (error) return <p className="notification is-danger">Error loading tasks.</p>;

  const filteredTasks = filterTasks(tasks, filters);

  return (
    <div className={styles.kanbanContainer}>
      <div className={styles.sidebar}>
        <CreateTaskForm />
      </div>

      <TaskFilter register={register} tasks={tasks} />

      <div className={`${styles.kanbanBoard} columns is-variable is-4`}>
        {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
          <div key={status} className="column is-one-third">
            <h3 className="title is-4 has-text-centered">
              {status.replace("_", " ")}
            </h3>
            <div className="box has-background-light p-3">
              {filteredTasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div key={task.id} className="card mb-3">
                    <header className="card-header">
                      <p className="card-header-title">{task.title}</p>
                    </header>
                    <div className="card-content">
                      <p>{task.description}</p>
                      <p className="has-text-grey">
                        Created By: {task.createdBy} | Assigned To: {task.assignedTo}
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
