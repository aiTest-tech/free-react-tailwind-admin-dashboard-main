import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Data Interfaces
export interface WtcAnalytics {
  total_applications: number;
  todays_applications: number;
  pending_applications: number;
  daily_average_applications: number;
}

const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_PORT;

const baseurl = `http://${host}:${port}/api/wtc/`;
// Define a service using a base URL and expected endpoints
export const wtcCardAnalytics = createApi({
  reducerPath: 'brijeshwtccard',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.2.179:6162/api/wtc/' }),
  baseQuery: fetchBaseQuery({ baseUrl: baseurl }),
  endpoints: (builder) => ({
    getwtcCardAnalytics: builder.query<WtcAnalytics, void>({
      query: () => `analytics/`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetwtcCardAnalyticsQuery } = wtcCardAnalytics;
