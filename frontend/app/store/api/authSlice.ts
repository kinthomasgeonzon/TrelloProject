import { LoginFormData } from "@login/schemas/loginSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignupFormData } from "@signup/schemas/signupSchema";

export interface ResetPasswordData {
  token: string | null;
  newPassword: string;
}

interface RequestResetPasswordData {
  email: string;
}

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.PRODUCTION_BE_URL || "https://trelloproject-1.onrender.com"; 

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation<void, SignupFormData>({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    loginUser: builder.mutation<{ user: any; token: string; role: string }, LoginFormData>({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    resetPassword: builder.mutation<void, RequestResetPasswordData>({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    updatePassword: builder.mutation<void, ResetPasswordData>({
      query: ({ token, newPassword }) => ({
        url: "/update-password",
        method: "POST",
        body: { token, newPassword },
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
} = authApi;
