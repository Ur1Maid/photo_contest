import { createApi } from "@reduxjs/toolkit/query/react";
import { Photo } from "../../types/Photo.ts";
import { baseQueryWithReauth } from "./baseQueryWithReauth.ts";

export const photoApi = createApi({
  reducerPath: "photoApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllPhotos: builder.query({
      query: (contestId) => `photo/get_all/?contest_id=${contestId}`,
    }),
    getPhoto: builder.query<Photo, number>({
      query: (photo_id) => `photo/get/?photo_id=${photo_id}`,
    }),
    addPhoto: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "photo/add",
        method: "POST",
        body: formData,
      }),
    }),
    getPhotoVotes: builder.query({
      query: (photo_id) => `vote/get_all/?photo_id=${photo_id}`, // Новый запрос
    }),
    votePhoto: builder.mutation({
      query: ({ photo_id, rate }) => ({
        url: "vote/add",
        method: "POST",
        body: { photo_id, rate },
      }),
    }),
    getPhotoComments: builder.query({
      query: (photo_id) => `comment/get_all?photo_id=${photo_id}`,
    }),
    addComment: builder.mutation({
      query: ({ photo_id, text }) => ({
        url: "comment/add",
        method: "POST",
        body: { photo_id, text },
      }),
    }),
  }),
});

export const {
  useGetAllPhotosQuery,
  useGetPhotoQuery,
  useAddPhotoMutation,
  useGetPhotoVotesQuery,
  useVotePhotoMutation,
  useAddCommentMutation,
  useGetPhotoCommentsQuery,
} = photoApi;
