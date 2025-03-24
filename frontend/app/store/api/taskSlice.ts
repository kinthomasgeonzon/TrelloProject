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
  tagTypes: ["Tasks", "Users"],
  endpoints: (builder) => ({
    getAllTasks: builder.query<any[], Partial<{ status: string; createdBy: string; assignedTo: string }>>({
      query: (filters) => {
        const filteredParams = Object.fromEntries(
          Object.entries(filters || {}).filter(([_, value]) => value && value !== "ALL")
        );

        return {
          url: "tasks",
          method: "GET",
          params: filteredParams, 
        };
      },
      transformResponse: (response: any) => response?.tasks ?? [],
      providesTags: ["Tasks"],
    }),

    getAllUsers: builder.query<{ id: string; name: string }[], void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      transformResponse: (response: any) => response?.users ?? [],
      providesTags: ["Users"],
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

export const { useGetAllTasksQuery, useGetAllUsersQuery, useCreateTaskMutation } = tasksApi;
