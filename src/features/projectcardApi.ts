import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_PORT;

const baseurl = `http://${host}:${port}/`

export interface CARDData {
    "wtc": number;
}

export const projectCardApi = createApi({
    reducerPath: 'projectCardApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseurl +  'api/auth/project/' }),
    endpoints: (builder) => ({
        getProjectCardData: builder.query<CARDData, void>({
            query: () => `summary/`,
        }),
    }),
});

export const { useGetProjectCardDataQuery } = projectCardApi;