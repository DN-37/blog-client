import { Post, Posts } from "../types"
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
    getAllPosts: builder.query<Posts, { page: number; count: string }>({
      query: ({ page = 1, count = "2" }) => ({
        url: `/posts?page=${page}&count=${count}`,
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
