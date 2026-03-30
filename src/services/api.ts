import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/user.model";

interface GetUsers {
  data: Array<User>;
}
interface GetUsersArg {
  project_id: string;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reqres.in/api/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsers, Partial<GetUsersArg>>({
      query: ({ project_id } = {}) => ({
        url: "collections/users/records",
        params: {
          project_id,
        },
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;

