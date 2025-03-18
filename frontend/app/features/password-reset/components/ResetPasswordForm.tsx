"use client";

import Button from "@components/button/Button";
import Input from "@components/input/Input";
import { useUpdatePasswordMutation } from "@store/api/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/resetPassword.module.css";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (!token) {
      router.replace("/404");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      if (!token) throw new Error("Invalid or missing token");

      await updatePassword({ token, newPassword }).unwrap();
      setMessage("Password updated! Redirecting to login...");
    } catch (error: any) {
      setIsError(true);
      if (error?.status === 404 || error?.status === 401) {
        router.replace("/404");
      } else {
        setMessage(error.data?.message || "Something went wrong");
      }
    } finally {
      setNewPassword(""); // Clear input field after attempt
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.resetPasswordBox}>
        <h2 className="title is-4">Enter New Password</h2>
        {message && (
          <p className={`notification ${isError ? "is-danger" : "is-success"}`}>
            {message}
          </p>
        )}

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
