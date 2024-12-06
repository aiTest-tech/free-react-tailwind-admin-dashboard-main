
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Data Interfaces
export interface TypeDistributionInterface {
  ptype:string;
  count:number
}

const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_PORT;

const baseurl = `http://${host}:${port}/`

// Define a service using a base URL and expected endpoints
export const TypeDistributionApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseurl + 'api/wtc/' }),
  endpoints: (builder) => ({
    getTypeDistributionApi: builder.query<TypeDistributionInterface[], void>({
      query: () => `type-distribution/`, // Adjust this path to match your actual endpoint
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetTypeDistributionApiQuery } = TypeDistributionApi;
