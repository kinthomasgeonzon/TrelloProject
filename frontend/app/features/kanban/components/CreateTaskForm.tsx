"use client";

import Button from "@components/button/Button";
import Input from "@components/input/Input";
import Modal from "@components/modal/Modal";
import { useCreateTaskForm } from "../hooks/useCreateTaskForm";
import styles from "../styles/createTaskForm.module.css";

export default function CreateTaskForm() {
  const { register, handleSubmit, onSubmit, errors, isLoading, isOpen, setIsOpen } =
    useCreateTaskForm();

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
          <Input
            label="Description (Optional)"
            {...register("description")}
          />
          <Input
            label="Due Date"
            type="date"
            {...register("dueDate")}
          />
          <Input
            label="Assigned To (Optional)"
            type="number"
            min="0"
            {...register("assignedTo")}
          />

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