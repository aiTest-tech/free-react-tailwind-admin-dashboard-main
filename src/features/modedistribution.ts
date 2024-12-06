import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Data Interfaces
export interface ModeDistributionInterface {
  mode: string;
  count: number;
}

const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_PORT;

const baseurl = `http://${host}:${port}/`

// Define a service using a base URL and expected endpoints
export const modedistributionApi = createApi({
  reducerPath: 'brijeshmodeldistributionapi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.2.179:6162/api/wtc/' }),
  baseQuery: fetchBaseQuery({ baseUrl: baseurl + 'api/wtc/' }),
  endpoints: (builder) => ({
    modeDistributionApi: builder.query<ModeDistributionInterface, void>({
      query: () => `mode-distribution`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useModeDistributionApiQuery } = modedistributionApi;
