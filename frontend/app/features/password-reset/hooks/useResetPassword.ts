"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePasswordMutation } from "@store/api/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FieldErrors, useForm, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import * as z from "zod";

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const token = useMemo(() => {
    return searchParams?.get("token") || localStorage.getItem("resetToken") || "";
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [updatePasswordMutation, { isLoading }] = useUpdatePasswordMutation();

  const resetPassword = async (data: ResetPasswordFormData) => {
    setMessage("");
    setIsError(false);
  
    if (!token) {
      setIsError(true);
      setMessage("Invalid or missing token");
      return;
    }
  
    try {
      await updatePasswordMutation({ token, newPassword: data.newPassword }).unwrap();
      setMessage("Password updated! Redirecting to login...");
      router.push("/login");
    } catch (error: any) {
      setIsError(true);
      setMessage(error?.data?.message || "Something went wrong");
  
      if ([404, 401].includes(error?.status)) {
        router.replace("/404");
      }
    } finally {
      localStorage.removeItem("resetToken");
    }
  };
  
  useEffect(() => {
    if (token) {
      localStorage.setItem("resetToken", token);
    } else {
      router.replace("/404");
    }
  }, [token, router]);

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
