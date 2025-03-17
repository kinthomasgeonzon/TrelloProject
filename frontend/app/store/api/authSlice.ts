import { LoginFormData } from "@login/schemas/loginSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignupFormData } from "@signup/schemas/signupSchema";

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
  }),
});

export const { useSignupUserMutation, useLoginUserMutation } = authApi;
