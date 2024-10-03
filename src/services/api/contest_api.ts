import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth.ts";

export const contestApi = createApi({
  reducerPath: "contestApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addContest: builder.mutation<void, string>({
      query: (contestData) => ({
        url: "contest/add",
        method: "POST",
        body: contestData,
      }),
    }),
    getParticipated: builder.query<any, void>({
      query: () => "contest/participated",
    }),
    getCreated: builder.query<any, void>({
      query: () => "contest/created",
    }),
    joinContest: builder.mutation<void, number>({
      query: (contestId) => ({
        url: "contest/join_contest",
        method: "POST",
        body: contestId,
      }),
    }),
    getAvailableContests: builder.query<any, void>({
      query: () => "contest/available",
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useAddContestMutation,
  useGetParticipatedQuery,
  useGetCreatedQuery,
  useJoinContestMutation,
  useGetAvailableContestsQuery,
} = contestApi;
