"use client";

import { useSignupUserMutation } from "@/app/store/api/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SignupFormData, signupSchema } from "@signup/schemas/signupSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignup = () => {
  const [signupUser, { isLoading: loading, isSuccess: success }] = useSignupUserMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const getErrorMessage = (error: unknown) => {
    if (error && typeof error === "object" && "data" in error) {
      const errData = (error as FetchBaseQueryError).data;
      if (errData && typeof errData === "object" && "message" in errData) {
        return (errData as { message?: string }).message || "Signup failed. Try again.";
      }
    }
    return "Signup failed. Try again.";
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      setErrorMessage(null); 
      await signupUser(data).unwrap();
    } catch (err) {
      console.error("Signup failed:", err);
      setErrorMessage(getErrorMessage(err)); 
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
    success,
    error: errorMessage, 
  };
};
