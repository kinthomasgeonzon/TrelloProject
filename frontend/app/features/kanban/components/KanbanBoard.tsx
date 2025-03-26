"use client";

import { useGetAllTasksQuery } from "@store/api/taskSlice";
import { useState } from "react";
import { useTaskFilters } from "../hooks/useTaskFilters";
import styles from "../styles/kanban.module.css";
import CreateTaskForm from "./CreateTaskForm";
import DeleteTaskButton from "./DeleteTask";
import EditTaskForm from "./EditTaskForm";
import TaskFilter from "./TaskFilter";

const KanbanBoard: React.FC = () => {
  const { register, handleSubmit, resetFilters, applyFilters, getFilteredQuery, uniqueCreators, uniqueAssignees } = useTaskFilters();
  const [filters, setFilters] = useState(getFilteredQuery());
  const { data: tasksData, error, isLoading } = useGetAllTasksQuery(filters);
  const tasks = Array.isArray(tasksData) ? tasksData : [];

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (isLoading) return <p className="notification is-info">Loading tasks...</p>;
  if (error) return <p className="notification is-danger">Error loading tasks.</p>;

  return (
    <div className={styles.kanbanContainer}>
 
      <TaskFilter
        register={register}
        handleSubmit={handleSubmit}
        applyFilters={(data) => setFilters(data)}
        resetFilters={() => {
          resetFilters();
          setFilters(getFilteredQuery());
        }}
        uniqueCreators={uniqueCreators}
        uniqueAssignees={uniqueAssignees}
      />

      <CreateTaskForm />

      <div className={`${styles.kanbanBoard} columns is-variable is-4`}>
        {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
          <div key={status} className="column is-one-third">
            <h3 className="title is-4 has-text-centered">{status.replace("_", " ")}</h3>
            <div className="box has-background-light p-3">
              {tasks.filter((task) => task.status === status).length === 0 ? (
                <p className="has-text-centered has-text-grey-light">No tasks available.</p>
              ) : (
                tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <div key={task.id} className="card mb-3">
                      <header className="card-header">
                        <p className="card-header-title">{task.title}</p>
                        <DeleteTaskButton taskId={Number(task.id)} />
                      </header>
                      <div className="card-content">
                        <p>{task.description}</p>
                        <p className="has-text-grey">
                          Created By: {task.createdBy} | Assigned To: {task.assignedTo}
                        </p>
                      </div>
                      <footer className="card-footer">
                        <button
                          className="card-footer-item button is-small is-info"
                          onClick={() => {
                            setSelectedTask(task);
                            setIsEditOpen(true);
                          }}
                        >
                          Edit
                        </button>
                      </footer>
                    </div>
                  ))
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedTask && (
        <EditTaskForm
          task={selectedTask}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          closeModal={() => setIsEditOpen(false)}/>
      )}
    </div>
  );
};

export default KanbanBoard;
