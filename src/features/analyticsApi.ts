// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// // API Data Interfaces
// export interface ASRData {
//   project: string;
//   total_minutes_called: number;
//   total_requests: number;
//   success_rate: number;
// }

// export interface SentimentData {
//   project: string;
//   total_requests: number;
//   success_rate: number;
// }

// export interface L1ScrutinyData {
//   project: string;
//   total_requests: number;
//   success_rate: number;
// }

// // Redux State Interface
// export interface APIState {
//   asr: ASRData[];
//   sentiment: SentimentData[];
//   l1_scrutiny: L1ScrutinyData[];
//   loading: boolean;
//   error: string | null;
// }


// // Define a service using a base URL and expected endpoints
// export const pokemonApi = createApi({
//   reducerPath: 'pokemonApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.2.179:5555/api/analytics/' }),
//   endpoints: (builder) => ({
//     getPokemonByName: builder.query<, void>({
//       query: (name) => `pokemon/${name}`,
//     }),
//   }),
// })

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useGetPokemonByNameQuery } = pokemonApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Data Interfaces
export interface ASRData {
  project: string;
  total_minutes_called: number;
  total_requests: number;
  success_rate: number;
  failure_request:number;
  success_request:number;
  failure_rate:number;
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
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.2.179:5555/api/' }),
  endpoints: (builder) => ({
    getAnalyticsData: builder.query<APIState, void>({
      query: () => `analytics/`, // Adjust this path to match your actual endpoint
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetAnalyticsDataQuery } = analyticsApi;
