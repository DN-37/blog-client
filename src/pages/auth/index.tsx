import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { useState } from "react"
import { Login } from "../../features/login"
import { Register } from "../../features/register"

export const Auth = () => {
  const [selected, setSelected] = useState("login")

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="max-w-full w-[400px] h-[450px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="lg"
            radius="full"
            color="primary"
            selectedKey={selected}
            onSelectionChange={key => setSelected(key as string)}
          >
            <Tab key="login" title="Вход">
              <Login setSelected={setSelected} />
            </Tab>
            <Tab key="sign-up" title="Регистрация">
              <Register setSelected={setSelected} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  )
}
