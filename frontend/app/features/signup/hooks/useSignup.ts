"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useForm } from "react-hook-form";
import { useSignupUserMutation } from "../../../store/api/signupSlice";
import { SignupFormData, signupSchema } from "../schemas/signupSchema";

export const useSignup = () => {
  const [signupUser, { isLoading: loading, isSuccess: success, error }] = useSignupUserMutation();

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
      if (typeof errData === "object" && errData !== null && "message" in errData) {
        return (errData as { message: string }).message;
      }
    }
    return "Signup failed. Try again.";
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signupUser(data).unwrap();
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
    success,
    error: error ? getErrorMessage(error) : null,
  };
};
