import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface WTCData{
  subject: string;
  message:string;
  email:string;
  created_at:string;
  lo_sc:string;
  sentiment_cal_gra:string;
  sentiment_cal_pol:string;
  depr_rout:string
}

// Define a service using a base URL and expected endpoints
export const wtcApi = createApi({
  reducerPath: 'wtcapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.2.179:6162/api/' }),
  endpoints: (builder) => ({
    getWtcsData: builder.query<WTCData[], void>({
      query: () => `wtc/`, // Adjust this path to match your actual endpoint
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetWtcsDataQuery } = wtcApi;
