"use client";

import Button from "@components/button/Button";
import Input from "@components/input/Input";
import Modal from "@components/modal/Modal";
import { useGetAllUsersQuery } from "@store/api/userSlice";
import { useCreateTaskForm } from "../hooks/useCreateTaskForm";
import styles from "../styles/createTaskForm.module.css";

export default function CreateTaskForm() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isOpen,
    setIsOpen,
  } = useCreateTaskForm();

  const { data: users = [], isLoading: isUsersLoading } = useGetAllUsersQuery();

  return (
    <>
      <div className={styles.sidebarToggle} onClick={() => setIsOpen(true)}>
        ➕
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3 className={styles.title}>Create Task</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            {...register("title")}
            errorText={errors.title?.message}
          />
          <Input label="Description (Optional)" {...register("description")} />

          <Input
            label="Due Date"
            type="date"
            className={styles.dateInput}
            {...register("dueDate")}
          />

          <div className="field">
            <label className="label">Assigned To (Optional)</label>
            <div className="select">
              <select {...register("assignedTo")}>
                <option value="">Unassigned</option>
                {isUsersLoading ? (
                  <option disabled>Loading users...</option>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <option key={user.id} value={String(user.id)}>
                      {user.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No users found</option>
                )}
              </select>
            </div>
            {errors.assignedTo && (
              <p className="help is-danger">Please select a valid user</p>
            )}
          </div>

          <div className={styles.buttonWrapper}>
            <Button type="submit" loading={isLoading}>
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
