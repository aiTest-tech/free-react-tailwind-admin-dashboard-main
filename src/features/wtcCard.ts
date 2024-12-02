
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Data Interfaces
export interface WtcAnalytics {
  total_applications:number;
  todays_applications:number;
  pending_applications:number;
  daily_average_applications:number;
}
// Define a service using a base URL and expected endpoints
export const wtcCardAnalytics = createApi({
  reducerPath: 'brijeshwtccard',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.2.179:6162/api/wtc/' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.2.179:5555/api/wtc/' }),
  endpoints: (builder) => ({
    getwtcCardAnalytics: builder.query<WtcAnalytics, void>({
      query: () => `analytics/`, 
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetwtcCardAnalyticsQuery } = wtcCardAnalytics;
