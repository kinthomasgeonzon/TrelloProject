"use client";

import Button from "@components/button/Button";
import Input from "@components/input/Input";
import Modal from "@components/modal/Modal";
import { useCreateTaskMutation } from "@store/api/taskSlice";
import { useState } from "react";
import styles from "../styles/createTaskForm.module.css";

export default function CreateTaskForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState<number | "">("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleCreateTask = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");
    setSuccess("");

    try {
      await createTask({
        title,
        description,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        status: "TODO",
        createdBy: 1,
        assignedTo: assignedTo || null,
        taskOrder: 1,
      }).unwrap();

      setSuccess("Task successfully created! ");
      setTitle("");
      setDescription("");
      setDueDate("");
      setAssignedTo("");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error creating task");
    }
  };

  return (
    <>
      <div className={styles.sidebarToggle} onClick={() => setIsOpen(true)}>
        ➕
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3 className={styles.title}>Create Task</h3>

        {error && <div className={styles.notificationDanger}>{error}</div>}
        {success && <div className={styles.notificationSuccess}>{success}</div>}

        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          errorText={!title.trim() ? error : ""}
        />
        <Input
          label="Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <Input
          label="Assigned To (Optional)"
          type="number"
          min="0"
          value={assignedTo}
          onChange={(e) =>
            setAssignedTo(e.target.value ? Number(e.target.value) : "")
          }
        />

        <div className={styles.buttonWrapper}>
          <Button loading={isLoading} onClick={handleCreateTask}>
            {isLoading ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </Modal>
    </>
  );
}


