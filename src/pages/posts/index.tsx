import { Card } from "../../components/card"
import { CreatePost } from "../../components/create-post"
import { useGetAllPostsQuery } from "../../app/services/postApi"
import { Button, Select, SelectItem } from "@nextui-org/react"
import React from "react"
import ReactPaginate from "react-paginate"

export const Posts = () => {
  const [filter, setFilter] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [count, setCount] = React.useState("2")
  let { data } = useGetAllPostsQuery({ page, count, filter })

  return (
    <>
      <div className="mb-10 w-full flex">
        <CreatePost page={page} count={count} filter={filter} />
      </div>
      <div className="mb-10 flex w-full flex-wrap md:flex-nowrap gap-4">
        <Select
          className="max-w-xs"
          aria-label="Select"
          placeholder="Выберите нужные посты"
          onChange={e => setFilter(e.target.value)}
        >
          <SelectItem key="enemy" value="enemy">
            Чужие
          </SelectItem>
          <SelectItem key="my" value="my">
            Только мои
          </SelectItem>
        </Select>
        <Select
          className="max-w-xs"
          aria-label="Select-count"
          placeholder="Выберите количество постов на странице"
          onChange={e => setCount(e.target.value)}
        >
          <SelectItem key="2" value="2">
            2
          </SelectItem>
          <SelectItem key="3" value="3">
            3
          </SelectItem>
          <SelectItem key="4" value="4">
            4
          </SelectItem>
          <SelectItem key="5" value="5">
            5
          </SelectItem>
        </Select>
      </div>
      <div className="mb-10">
        <ReactPaginate
          className="flex items-center justify-center gap-2"
          onPageChange={e => setPage(e.selected + 1)}
          breakLabel="..."
          pageCount={data?.pageCount ?? 0}
          previousLabel={
            <Button onClick={() => setPage(page - 1)}>
              Предыдущая страница
            </Button>
          }
          nextLabel={
            <Button onClick={() => setPage(page + 1)}>
              Следующая страница
            </Button>
          }
        />
      </div>
      {data?.posts && data.posts.length > 0
        ? data.posts.map(
            ({
              content,
              author,
              id,
              authorId,
              likedByUser,
              createdAt,
              comments,
              likes,
            }) => (
              <Card
                key={id}
                avatarUrl={author.avatarUrl ?? ""}
                content={content}
                name={author.name ?? ""}
                authorId={authorId}
                id={id}
                likedByUser={likedByUser}
                createdAt={createdAt}
                cardFor="post"
                page={page}
                count={count}
                filter={filter}
                likesCount={likes.length}
                commentsCount={comments.length}
              />
            ),
          )
        : null}
    </>
  )
}
