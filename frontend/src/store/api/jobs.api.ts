import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IJobs } from "../../types";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["JobsApiList"],
  endpoints: (builder) => ({
    getJobs: builder.query<IJobs, void>({
      query: () => ({
        url: "/jobs",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
