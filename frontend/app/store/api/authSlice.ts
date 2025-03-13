import { LoginFormData } from "@login/schemas/loginSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignupFormData } from "@signup/schemas/signupSchema";

interface ResetPasswordData {
  token: string | null;
  newPassword: string;
}

interface RequestResetPasswordData {
  email: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/auth",
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
    loginUser: builder.mutation<void, LoginFormData>({
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
