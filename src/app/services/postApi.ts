import { Post } from "../types"
import { api } from "./api"

export const postApi = api.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<Post, { content: string }>({
      query: postData => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
    }),
    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
} = postApi

export const {
  endpoints: { createPost, getAllPosts },
} = postApi
