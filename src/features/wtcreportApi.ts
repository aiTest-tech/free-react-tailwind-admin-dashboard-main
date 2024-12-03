import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface WTCData {
  id: number;
  subject: string;
  name:string;
  message: string;
  email: string;
  created_at: string;
  lo_sc: string;
  lo_sc_hu: string;
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
export const wtcReportApi = createApi({
  reducerPath: 'wtcReportapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.2.179:5555/api/wtc/' }),
  endpoints: (builder) => ({
    getWtcsReport: builder.query<WTCData[], void>({
      query: () => `records/`, // Adjust this path to match your actual endpoint
    }),
  }),
});

// Export hooks for usage in functional components
// export const { useGetWtcsDataQuery } = wtcApi;

export const { useGetWtcsReportQuery } = wtcReportApi;
