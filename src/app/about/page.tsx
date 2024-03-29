"use client"
import { NextPage } from "next"
import WithAuth from "../components/Auth"

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const AboutPage: NextPage<{ user: any }> = ({ user }) => {
    console.log(user)
    return <h1>AboutPage</h1>
}

export default WithAuth(AboutPage)
