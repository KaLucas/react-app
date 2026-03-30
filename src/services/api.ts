import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../models/user.model';

interface GetUsers {
  data: Array<User>;
}
interface GetUsersArg {
  project_id: string;
}

interface EditUserArg {
  project_id: string;
  id: string;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://reqres.in/api/',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsers, Partial<GetUsersArg>>({
      query: ({ project_id }) => ({
        url: 'collections/users/records',
        params: {
          project_id,
        },
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
        },
      }),
    }),
    editUser: builder.mutation<void, EditUserArg>({
      query: ({ project_id, id }) => ({
        url: `collections/users/${id}`,
        params: {
          project_id,
        },
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
        },
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
