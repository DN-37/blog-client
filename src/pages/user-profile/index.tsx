import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useGetUserByIdQuery } from "../../app/services/userApi"
import { useDispatch, useSelector } from "react-redux"
import { resetUser, selectCurrent } from "../../features/userSlice"
import { Button, Card, Image } from "@nextui-org/react"
import { MdOutlinePersonAddAlt1 } from "react-icons/md"
import { MdOutlinePersonAddDisabled } from "react-icons/md"
import { GoBack } from "../../components/go-back"
import { BASE_URL } from "../../constant"
import { CiEdit } from "react-icons/ci"
import { formatToClientDate } from "../../utils/format-to-client"
import { ProfileInfo } from "../../components/profile-info"

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const currentUser = useSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(id ?? "")

  const dispatch = useDispatch()

  useEffect(
    () => () => {
      dispatch(resetUser())
    },
    [],
  )

  if (!data) {
    return null
  }

  return (
    <>
      <GoBack />
      <div className="flex items-stretch gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data?.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                endContent={
                  data?.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data?.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />}>Редактировать</Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Почта:" info={data.email} />
          <ProfileInfo title="Местоположение:" info={data.location} />
          <ProfileInfo
            title="Дата рождения:"
            info={formatToClientDate(data.dateOfBirth)}
          />
          <ProfileInfo title="Обо мне:" info={data.bio} />
        </Card>
      </div>
    </>
  )
}
