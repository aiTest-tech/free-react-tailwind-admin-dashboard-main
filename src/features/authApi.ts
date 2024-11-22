// src/services/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthType } from '../utils/authSchema';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.10.2.179:5555/',
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
        url: 'api/auth/login/',
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
