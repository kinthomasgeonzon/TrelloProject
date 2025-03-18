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
  tagTypes: ["Tasks"], 
  endpoints: (builder) => ({
    getAllTasks: builder.query<{ tasks: any[] }, void>({
      query: () => "tasks",
      transformResponse: (response: { tasks: any[] }) => ({ tasks: response.tasks || [] }),
      providesTags: ["Tasks"], 
    }),
    createTask: builder.mutation({
      query: (taskData) => ({
        url: "tasks",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Tasks"], 
    }),
  }),
});

export const { useGetAllTasksQuery, useCreateTaskMutation } = tasksApi;
