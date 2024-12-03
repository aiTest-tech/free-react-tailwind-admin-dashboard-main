import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface CARDData {
  "wtc": number;
}

export const projectCardApi = createApi({
  reducerPath: 'projectCardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.2.179:5555/api/auth/project/' }),
  endpoints: (builder) => ({
    getProjectCardData: builder.query<CARDData, void>({
      query: () => `summary/`,
    }),
  }),
});

export const {useGetProjectCardDataQuery}  = projectCardApi;