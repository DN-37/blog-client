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
    getAllPosts: builder.query<
      Posts,
      { page: number; count: string; filter: string }
    >({
      query: ({ page = 1, count = "2", filter = "my" }) => ({
        url: `/posts?page=${page}&count=${count}&filter=${filter}`,
        method: "GET",
      }),
    }),
    deletePost: builder.mutation<void, string>({
      query: id => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
    }),
    getPostById: builder.query<Post, string>({
      query: id => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} = postApi

export const {
  endpoints: { createPost, getAllPosts, getPostById, deletePost },
} = postApi
