import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postApi"
import { Card } from "../../components/card"
import { GoBack } from "../../components/go-back"

export const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params?.id ?? "")

  if (!data) {
    return <h2>Поста не существует</h2>
  }

  const { content, id, authorId, author, likedByUser, createdAt } = data

  return (
    <>
      <GoBack />
      <Card
        cardFor="current-post"
        avatarUrl={author?.avatarUrl ?? ""}
        content={content}
        name={author?.name ?? ""}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
        page={1}
        count={"1"}
        filter={""}
      />
    </>
  )
}
