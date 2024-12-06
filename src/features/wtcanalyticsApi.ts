
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Data Interfaces
export interface WtcAnalytics {
  total_accepted:number;
  total_rejected:number;
  machine_accepted:number;
  machine_rejected:number;
  accuracy:number
}

const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_PORT;

const baseurl = `http://${host}:${port}/`
// Define a service using a base URL and expected endpoints
export const wtcAnalyticsApi = createApi({
  reducerPath: 'brijeshAnalyticsApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.2.179:6162/api/wtc/' }),
  baseQuery: fetchBaseQuery({ baseUrl: baseurl + 'api/wtc/' }),
  endpoints: (builder) => ({
    getWtcAnalytics: builder.query<WtcAnalytics, void>({
      query: () => `scrutiny-statistics/`, 
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetWtcAnalyticsQuery } = wtcAnalyticsApi;
