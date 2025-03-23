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
    getAllTasks: builder.query<
      any[],
      Partial<{ status: string; createdBy: string; assignedTo: string }>
    >({
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
  }),
});

export const {
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useUpdateTaskOrderMutation,
} = tasksApi;
