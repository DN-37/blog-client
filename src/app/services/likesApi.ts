import { Like } from "../types"
import { api } from "./api"

export const likesApi = api.injectEndpoints({
  endpoints: builder => ({
    likePost: builder.mutation<Like, { postId: string }>({
      query: body => ({
        url: "/likes",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useLikePostMutation } = likesApi

export const {
  endpoints: { likePost },
} = likesApi
