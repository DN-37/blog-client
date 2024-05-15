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
  followers: Follows[]
  comments: Comment[]
}

export type Post = {
  id: string
  content: string
  author: User
  authorId: string
  likedByUser: boolean
  createdAt: Date
  updatedAt: Date
  comments: Comment[]
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

export type Comment = {
  id: string
  content: string
  user: User
  userId: string
  post: Post
  postId: string
}

export type Like = {
  id: string
  user: User
  userId: string
  post: Post
  postId: string
}
