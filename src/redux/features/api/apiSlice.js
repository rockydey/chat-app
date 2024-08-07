import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["chat"],
  endpoints: (builder) => ({
    fetchChats: builder.query({
      query: (fileName) => `${fileName}`,
      providesTags: ["chat"],
    }),
  }),
});

export const { useFetchChatsQuery } = chatApi;
