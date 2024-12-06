// src/services/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthType } from '../utils/authSchema';

const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_PORT;

const baseurl = `http://${host}:${port}/`

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseurl,
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendloginCredentials: builder.mutation<{ access: string; refresh: string }, AuthType>({
      query: (credentials) => ({
        url: baseurl + 'api/auth/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation<{ access: string }, { refreshToken: string }>({
      query: ({ refreshToken }) => ({
        url: 'api/auth/refresh/',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
  }),
});

export const { useSendloginCredentialsMutation, useRefreshTokenMutation } = authApi;
