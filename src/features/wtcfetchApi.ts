import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_PORT;

const baseurl = `http://${host}:${port}/`

export interface WTCData {
  id: number;
  subject: string;
  name:string;
  message: string;
  email: string;
  created_at: string;
  lo_sc: string;
  sentiment_cal_gra: string;
  sentiment_cal_pol: string;
  depr_rout: string;
  phone: string;
  occupation:string;
  address:string;
  district_corporation:string;
  taluka_zone:string;
  village_area:string;
}

// Define a service using a base URL and expected endpoints
export const wtcApi = createApi({
  reducerPath: 'wtcapi',
  baseQuery: fetchBaseQuery({ baseUrl: baseurl +'api/wtc/' }),
  endpoints: (builder) => ({
    getWtcsData: builder.query<WTCData[], void>({
      query: () => `lo/`, // Adjust this path to match your actual endpoint
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetWtcsDataQuery } = wtcApi;
