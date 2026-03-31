import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '@models/user.model';

interface GetUsersResult {
  data: Array<User>;
  total: number;
}
interface GetUsersResponse {
  data: Array<User>;
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
interface GetUsersArg {
  project_id: string;
  page: number;
  limit: number;
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
    getUsers: builder.query<GetUsersResult, GetUsersArg>({
      query: ({ project_id, page, limit }) => ({
        url: 'collections/users/records',
        params: {
          project_id,
          page,
          limit,
        },
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
        },
      }),
      transformResponse: (response: GetUsersResponse) => {
        return {
          data: response.data,
          total: response.meta.total,
          page: response.meta.page,
          perPage: response.meta.limit,
        };
      },
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
