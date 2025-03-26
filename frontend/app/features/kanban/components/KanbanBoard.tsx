"use client";
import { DragDropContext } from "@hello-pangea/dnd";
import { useGetAllTasksQuery } from "@store/api/taskSlice";
import { useAuth } from "../hooks/useAuth";
import { useTaskDragAndDrop } from "../hooks/useTaskDragAndDrop";
import { useTaskFilters } from "../hooks/useTaskFilters";
import styles from "../styles/kanban.module.css";
import DroppableColumn from "./Column";
import CreateTaskForm from "./CreateTaskForm";
import LogoutButton from "./LogOut";
import Sidebar from "./Sidebar";
import TaskFilter from "./TaskFilter";

const KanbanBoard: React.FC = () => {
  const { register, handleSubmit, resetFilters, applyFilters, uniqueCreators, uniqueAssignees, filters } = useTaskFilters();
  const { data: tasks = [] } = useGetAllTasksQuery(filters);

  const { onDragEnd } = useTaskDragAndDrop();
  const { userRole } = useAuth();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.kanbanContainer}>
        <LogoutButton />
        <Sidebar userRole={userRole} />
        <TaskFilter
          register={register}
          handleSubmit={handleSubmit}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
          uniqueCreators={uniqueCreators}
          uniqueAssignees={uniqueAssignees}
        />
        {userRole === "ADMIN" && <CreateTaskForm />}
        <div className={`${styles.kanbanBoard} columns is-variable is-4`}>
          {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
            <DroppableColumn key={status} status={status} tasks={tasks} />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};
export default KanbanBoard;