import {
  Card as NextUiCard,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react"
import { Link } from "react-router-dom"
import { useLazyGetAllPostsQuery } from "../../app/services/postApi"
import { ErrorMessage } from "../error-message"
import { useState } from "react"
import { hasErrorField } from "../../utils/has-error-field"

type Props = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  commentId?: string
  createdAt?: Date
  id?: string
  cardFor: "comment" | "post" | "current-post"
  likedByUser?: boolean
}

export const Card = ({
  avatarUrl = "",
  name = "",
  content = "",
  authorId = "",
  id = "",
  cardFor = "post",
  likedByUser = false,
  createdAt,
  commentId = "",
}: Props) => {
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [error, setError] = useState("")

  const refetchPosts = async () => {
    switch (cardFor) {
      case "post":
        await triggerGetAllPosts().unwrap()
        break
      default:
        throw new Error("Неверный аргумент cardFor")
    }
  }

  const handleClick = async () => {
    try {
      await refetchPosts()
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      } else {
        setError(err as string)
      }
    }
  }

  return (
    <NextUiCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>Пользователь: {name}</Link>
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">Контент: {content}</CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={handleClick}>нажми для обновления</div>
            <Link to={`/posts/${id}`}>Пост номер: {id}</Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextUiCard>
  )
}
