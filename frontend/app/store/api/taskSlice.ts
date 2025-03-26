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
    getAllTasks: builder.query<
      any[],
      Partial<{ status: string; createdBy: string; assignedTo: string }>
    >({
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
      transformResponse: (response: any) =>
        response?.tasks.map((task: any) => ({
          ...task,
          createdBy: task.createdBy || null,
          assignedTo: task.assignedTo || null,
        })) ?? [],
      providesTags: ["Tasks"],
    }),

    getAllUsers: builder.query<{ id: number; name: string }[], void>({
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

    editTask: builder.mutation({
      query: ({ id, ...updatedTask }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: updatedTask,
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

export const {
  useGetAllTasksQuery,
  useGetAllUsersQuery,
  useCreateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation
} = tasksApi;
