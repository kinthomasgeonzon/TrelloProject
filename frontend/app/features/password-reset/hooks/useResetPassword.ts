"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordMutation } from "@store/api/authSlice";
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
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();

  const resetPassword = async (data: ResetPasswordFormData) => {
    setMessage("");

    try {
      await resetPasswordMutation(data).unwrap();
      setMessage("A reset link has been sent.");
    } catch (error: any) {
      setMessage(error.data?.message || "Something went wrong");
    }
  };

  return {
    register,
    handleSubmit,
    resetPassword,
    loading: isLoading,
    message,
    errors,
  };
};

export default useResetPassword;
