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

interface CreateUserArg {
  project_id: string;
  data: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface CreateUserResult {
  data: {
    id: string;
    collection_id: string;
    project_id: number;
    app_user_id: string | null;
    created_by: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    data: {
      email: string;
      last_name: string;
      first_name: string;
    };
  };
}
interface EditUserArg {
  project_id: string;
  data: {
    email: string;
    firstName: string;
    id?: string;
    lastName: string;
  };
}

type EditUserResult = CreateUserResult;

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://reqres.in/api/',
  }),
  tagTypes: ['Users'],
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
          'X-Reqres-Env': 'production',
        },
      }),
      providesTags: ['Users'],
      transformResponse: (response: GetUsersResponse) => {
        return {
          data: response.data,
          total: response.meta.total,
          page: response.meta.page,
          perPage: response.meta.limit,
        };
      },
    }),
    createUser: builder.mutation<CreateUserResult, CreateUserArg>({
      query: ({ project_id, data }) => {
        const { firstName, lastName, email } = data;
        return {
          url: `collections/users/records`,
          method: 'POST',
          params: { project_id },
          body: {
            data: {
              first_name: firstName,
              last_name: lastName,
              email,
            },
          },
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY,
            'X-Reqres-Env': 'production',
          },
        };
      },
      invalidatesTags: ['Users'],
    }),
    editUser: builder.mutation<EditUserResult, EditUserArg>({
      query: ({ project_id, data }) => {
        const { firstName, lastName, email, id } = data;
        return {
          url: `collections/users/records/${id}`,
          method: 'PUT',
          params: { project_id },
          body: {
            data: {
              first_name: firstName,
              last_name: lastName,
              email,
            },
          },
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY,
            'X-Reqres-Env': 'production',
          },
        };
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery, useEditUserMutation, useCreateUserMutation } = usersApi;
