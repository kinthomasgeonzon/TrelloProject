import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (taskData) => ({
        url: "tasks",
        method: "POST",
        body: taskData,
      }),
    }),
  }),
});

export const { useCreateTaskMutation } = tasksApi;
