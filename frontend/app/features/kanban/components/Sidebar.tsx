import styles from "../styles/kanban.module.css";
import CreateTaskForm from "./CreateTaskForm";

interface SidebarProps {
  userRole: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  return (
    <div className={styles.sidebar}>
      {userRole === "ADMIN" && <CreateTaskForm />}
    </div>
  );
};

export default Sidebar;
