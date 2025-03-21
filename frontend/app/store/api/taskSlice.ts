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
  }  
});

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery,
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getAllTasks: builder.query<any[], Partial<{ status: string; createdBy: string; assignedTo: string }>>({
      query: (filters) => {
        const filteredParams = Object.fromEntries(
          Object.entries(filters || {}).filter(([_, value]) => value !== "ALL")
        );

        return {
          url: "tasks",
          params: filteredParams,
        };
      },
      transformResponse: (response: any) => {
        if (!response) return [];
        return Array.isArray(response.tasks) ? response.tasks : response;
      },
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

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useGetAllTasksQuery, useCreateTaskMutation, useDeleteTaskMutation } = tasksApi;
