import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Data Interfaces
export interface ASRData {
  project: string;
  total_minutes_called: number;
  total_requests: number;
  success_rate: number;
  failure_request: number;
  success_request: number;
  failure_rate: number;
}

export interface SentimentData {
  project: string;
  total_requests: number;
  success_rate: number;
}

export interface L1ScrutinyData {
  project: string;
  total_requests: number;
  success_rate: number;
}

// Redux State Interface
export interface APIState {
  asr: ASRData[];
  sentiment: SentimentData[];
  l1_scrutiny: L1ScrutinyData[];
}

// Define a service using a base URL and expected endpoints
export const analyticsApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.2.179:5555/' }),
  endpoints: (builder) => ({
    getAnalyticsData: builder.query<APIState, void>({
      query: () => `api/analytics/`, 
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetAnalyticsDataQuery } = analyticsApi;