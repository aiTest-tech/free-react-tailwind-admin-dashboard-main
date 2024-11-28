
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Data Interfaces
export interface TypeDistributionInterface {
  ptype:string;
  count:number
}



// Define a service using a base URL and expected endpoints
export const TypeDistributionApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.2.179:6162/api/wtc/' }),
  endpoints: (builder) => ({
    getTypeDistributionApi: builder.query<TypeDistributionInterface[], void>({
      query: () => `type-distribution/`, // Adjust this path to match your actual endpoint
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetTypeDistributionApiQuery } = TypeDistributionApi;
