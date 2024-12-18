import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Data Interfaces
export interface TypeDistributionInterface {
  depr_rout_fetch_first: string | null | null;
  count: number;
}

const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_PORT;

const baseurl = `http://${host}:${port}/`

// Define a service using a base URL and expected endpoints
export const DepartmentRouteApi = createApi({
  reducerPath: 'departmentrouteapi',
  baseQuery: fetchBaseQuery({ baseUrl: baseurl + 'api/wtc/' }),
  endpoints: (builder) => ({
    getDepartmentRoute: builder.query<TypeDistributionInterface[], void>({
      query: () => `depr-rout-distribution/`, // Adjust this path to match your actual endpoint
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetDepartmentRouteQuery } = DepartmentRouteApi;
