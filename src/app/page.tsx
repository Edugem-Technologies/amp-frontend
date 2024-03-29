"use client"
import { doGetUserByAccessToken } from "@/services/user"
import { User } from "@/types/auth/user"
import { config } from "@/utils/constants"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import CustomLayout from "./components/common/CustomLayout"

export default function Home() {
  const [user, setUser] = useState<User>()
  const accessToken = getCookie(config.AUTH.COOKIE_NAME) as string

  const getUser = async () => {
    const response = await doGetUserByAccessToken(accessToken)
    if (response.data) {
      setUser(response.data)
    }
  }
  useEffect(() => {
    if (accessToken)
      getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <CustomLayout user={user}>
      <h1 className="text-center mt-4">Boiler plate code for NEXT 14</h1>
    </CustomLayout>
  )
}
