import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignupFormData } from "../../features/signup/schemas/signupSchema";

export const signupApi = createApi({
  reducerPath: "signupApi",
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
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useSignupUserMutation } = signupApi;
