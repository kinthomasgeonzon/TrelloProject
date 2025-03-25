"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordMutation } from "@store/api/authSlice";
import { useState } from "react";
import { FieldErrors, useForm, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import * as z from "zod";

const resetPasswordRequestSchema = z.object({
  email: z.string().email("Invalid email format"),
});

type ResetPasswordRequestFormData = z.infer<typeof resetPasswordRequestSchema>;

const useResetPasswordRequest = (): {
  register: UseFormRegister<ResetPasswordRequestFormData>;
  handleSubmit: UseFormHandleSubmit<ResetPasswordRequestFormData>;
  resetPasswordRequest: (data: ResetPasswordRequestFormData) => Promise<void>;
  loading: boolean;
  message: string;
  errors: FieldErrors<ResetPasswordRequestFormData>;
} => {
  const [message, setMessage] = useState("");
  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordRequestFormData>({
    resolver: zodResolver(resetPasswordRequestSchema),
  });

  const resetPasswordRequest = async (data: ResetPasswordRequestFormData) => {
    setMessage("");

    try {
      await resetPasswordMutation(data).unwrap();
      setMessage("A reset link has been sent to your email.");
    } catch (error: any) {
      setMessage(error.data?.message || "Something went wrong");
    } finally {
      reset();
    }
  };

  return {
    register,
    handleSubmit,
    resetPasswordRequest,
    loading: isLoading,
    message,
    errors,
  };
};

export default useResetPasswordRequest;
