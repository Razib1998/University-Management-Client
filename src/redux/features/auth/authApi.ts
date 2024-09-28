import { basApi } from "../../api/baseApi";

const autApi = basApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});
export const { useLoginMutation } = autApi;
