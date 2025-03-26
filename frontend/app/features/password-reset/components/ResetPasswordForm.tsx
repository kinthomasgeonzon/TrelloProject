"use client";

import Button from "@components/button/Button";
import Input from "@components/input/Input";
import { useUpdatePasswordMutation } from "@store/api/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/resetPassword.module.css";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
  
    try {
      if (!token) throw new Error("Invalid or missing token");
  
      await updatePassword({ token, newPassword }).unwrap();
      setMessage("Password updated! Redirecting to login...");
      router.push("/login");
    } catch (error: any) {
      setIsError(true);
      setMessage(error?.data?.message || "Something went wrong");
  
      if ([404, 401].includes(error?.status)) {
        router.replace("/404");
      }
    } finally {
      setNewPassword("");
    }
  };
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenFromURL = searchParams?.get("token") || "";
      const tokenFromStorage = localStorage.getItem("resetToken") || "";

      const finalToken = tokenFromURL || tokenFromStorage;
      setToken(finalToken);

      if (finalToken) {
        localStorage.setItem("resetToken", finalToken);
      } else {
        router.replace("/404");
      }
    }
  }, [searchParams, router]);

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
