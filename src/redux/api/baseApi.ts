import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const basQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5001/api/v1",
  credentials: "include",
  prepareHeaders: (Headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      Headers.set("authorization", `${token}`);
    }

    return Headers;
  },
});
export const basApi = createApi({
  reducerPath: "baseApi",
  baseQuery: basQuery,
  endpoints: () => ({}),
});
