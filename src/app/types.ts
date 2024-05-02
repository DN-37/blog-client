export type User = {
  id: string
  email: string
  password: string
  name?: string
  avatarUrl?: string
  dateOfBirth?: Date
  createdAt: Date
  updatedAt: Date
  bio?: string
  location?: string
  isFollowing?: boolean
  following: Follows[]
}

export type Post = {
  id: string
  content: string
  author: User
  authorId: string
  likedByUser: boolean
  createdAt: Date
  updatedAt: Date
}

export type Posts = {
  posts: Post[]
  page: number
  pageCount: number
}

export type Follows = {
  id: string
  follower: User
  followerId: string
  following: User
  followingId: string
}
