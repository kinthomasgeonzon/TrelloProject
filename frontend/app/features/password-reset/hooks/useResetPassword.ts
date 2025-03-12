"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldErrors, useForm, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import * as z from "zod";

const resetPasswordSchema = z.object({
  email: z.string().email(),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const useResetPassword = (): {
  register: UseFormRegister<ResetPasswordFormData>;
  handleSubmit: UseFormHandleSubmit<ResetPasswordFormData>;
  resetPassword: (data: ResetPasswordFormData) => Promise<void>;
  loading: boolean;
  message: string;
  errors: FieldErrors<ResetPasswordFormData>;
} => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const resetPassword = async (data: ResetPasswordFormData) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:4000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Something went wrong");
      }

      setMessage("If this email is registered, a reset link has been sent.");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    resetPassword,
    loading,
    message,
    errors,
  };
}

export default useResetPassword;
