import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_BE_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_BE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/`,
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

    createTask: builder.mutation({
      query: (taskData) => ({
        url: "tasks",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTaskStatus: builder.mutation<void, { taskId: number; newStatus: string }>({
      query: ({ taskId, newStatus }) => ({
        url: `tasks/${taskId}/status`,
        method: "POST",
        body: { status: newStatus },
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTaskOrder: builder.mutation<void, { taskId: number; taskOrder: number }>({
      query: ({ taskId, taskOrder }) => ({
        url: `tasks/${taskId}/task-order`,
        method: "PATCH",
        body: { taskOrder },
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
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useUpdateTaskOrderMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
