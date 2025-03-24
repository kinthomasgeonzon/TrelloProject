import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: number;
  name: string;
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
    endpoints: (builder) => ({
      getAllUsers: builder.query<User[], void>({
        query: () => "/users",
      }),
    }),
  });

export const { useGetAllUsersQuery } = userApi;
