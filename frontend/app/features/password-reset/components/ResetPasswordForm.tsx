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

  const [updatePassword, { isLoading, isSuccess, error }] = useUpdatePasswordMutation();
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (token !== undefined) {
        await updatePassword({ token, newPassword }).unwrap();
      } else {
        setMessage("Invalid token");
      }
      setMessage("Password updated! Redirecting to login...");
    } catch (error: any) {
      if (error?.status === 404 || error?.status === 401) {
        router.replace("/404");
      } else {
        setMessage(error.data?.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (!token) {
      router.replace("/404");
    }
  }, [router]);

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.resetPasswordBox}>
        <h2 className="title is-4">Enter New Password</h2>
        {message && (
          <p className={`notification ${isSuccess ? "is-success" : "is-danger"}`}>
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
