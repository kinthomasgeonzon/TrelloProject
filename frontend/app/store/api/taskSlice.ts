import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery,
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
    editTask: builder.mutation({
      query: ({ id, ...updatedTask }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: updatedTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useGetAllTasksQuery, useCreateTaskMutation, useEditTaskMutation } = tasksApi;
