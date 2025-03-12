"use client";

import Button from "@components/button/Button";
import Input from "@components/input/Input";
import { useRouter, useSearchParams } from "next/navigation"; // Import useRouter
import { useState } from "react";
import styles from "../styles/resetPassword.module.css";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get("token") : null;
  const router = useRouter(); // Initialize useRouter
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Track success state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("http://localhost:4000/auth/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const resData = await response.json();

    if (!response.ok) {
      setMessage(resData.message || "Something went wrong");
      setIsSuccess(false);
    } else {
      setMessage("Password updated! Redirecting to login...");
      setIsSuccess(true);
      
      // Redirect to login after 5 seconds
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    }

    setLoading(false);
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.resetPasswordBox}>
        <h2 className="title is-4">Enter New Password</h2>
        {message && <p className={`notification ${isSuccess ? "is-success" : "is-danger"}`}>
          {message}
        </p>}

        <form onSubmit={handleSubmit}>
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button type="submit" loading={loading}>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
