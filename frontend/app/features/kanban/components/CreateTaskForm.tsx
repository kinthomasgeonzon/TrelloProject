"use client";

import Button from "@components/button/Button";
import Input from "@components/input/Input";
import { useState } from "react";
import styles from "../styles/createTaskForm.module.css";

export default function CreateTaskForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateTask = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          description,
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
          status: "TODO",
          createdBy: 1,
          assignedTo: assignedTo || null,
          taskOrder: 1,
        }),
      });

      if (!response.ok) throw new Error("Failed to create task");

      setSuccess("Task successfully created! 🎉");

      setTitle("");
      setDescription("");
      setDueDate("");
      setAssignedTo("");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error creating task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {}
      <div className={styles.sidebarToggle} onClick={() => setIsOpen(true)}>
        ➕
      </div>

      {}
      {isOpen && (
        <div className={styles.backdrop} onClick={() => setIsOpen(false)}></div>
      )}

      {}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
          ✖
        </button>
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
          value={assignedTo}
          onChange={(e) =>
            setAssignedTo(e.target.value ? Number(e.target.value) : "")
          }
        />

        <div className={styles.buttonWrapper}>
          <Button loading={loading} onClick={handleCreateTask}>
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </div>
    </>
  );
}
