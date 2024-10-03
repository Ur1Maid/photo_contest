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
  }),
});

export const { useGetAllPhotosQuery, useGetPhotoQuery, useAddPhotoMutation } =
  photoApi;
