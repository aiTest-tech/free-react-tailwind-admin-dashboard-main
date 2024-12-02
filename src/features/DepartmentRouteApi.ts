
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Data Interfaces
export interface TypeDistributionInterface {
  depr_rout:string;
  count:number
}



// Define a service using a base URL and expected endpoints
export const DepartmentRouteApi = createApi({
  reducerPath: 'departmentrouteapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.2.179:5555/api/wtc/' }),
  endpoints: (builder) => ({
    getDepartmentRoute: builder.query<TypeDistributionInterface[], void>({
      query: () => `depr-rout-distribution/`, // Adjust this path to match your actual endpoint
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetDepartmentRouteQuery } = DepartmentRouteApi;
