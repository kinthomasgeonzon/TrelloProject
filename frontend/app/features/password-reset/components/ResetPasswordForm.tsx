"use client";

import Button from "@components/button/Button";
import Input from "@components/input/Input";
import { useUpdatePasswordMutation } from "@store/api/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "../styles/resetPassword.module.css";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get("token") : null;
  const router = useRouter(); 
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await updatePassword({ token, newPassword }).unwrap();
      setMessage("Password updated! Redirecting to login...");
      setIsSuccess(true);

      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error: any) {
      setMessage(error.data?.message || "Something went wrong");
      setIsSuccess(false);
    }
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

          <Button type="submit" loading={isLoading}>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
