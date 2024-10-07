import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const dadataKey = import.meta.env.VITE_DADATA_KEY;

const baseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
): Promise<any> => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `/`,

    prepareHeaders: (headers) => {
      headers.set("authorization", "Token " + dadataKey);
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
