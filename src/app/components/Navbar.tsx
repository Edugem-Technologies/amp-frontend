import { doGetUserByAccessToken } from "@/services/user"
import { config } from "@/utils/constants"
import { logout } from "@/utils/logout"
import { getCookie } from "cookies-next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Navbar = () => {
    const [user, setUser] = useState(null)
    const router = useRouter()
    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = getCookie(config.AUTH.COOKIE_NAME) as string
            if (accessToken && accessToken.length) {
                try {
                    const response = await doGetUserByAccessToken(accessToken)
                    if (response.status && response.data) {
                        setUser(response.data)
                    } else {
                        setUser(null)
                    }
                } catch (error) {
                    throw error
                }
            } else {
                setUser(null)
            }
        }
        fetchUser()
    }, [])

    const logoutUser = async () => {
        await logout(router)
    }

    return (
        <nav className="d-flex justify-content-center align-items-center">
            <div className="nav-link">
                <Link href={"/"}>Home</Link>
            </div>
            <div className="nav-link">
                <Link href={"/about"}>About</Link>
            </div>
            <div className="nav-link">
                {user ? (
                    <button className="btn btn-dark" onClick={logoutUser}>
                        Logout
                    </button>
                ) : (
                    <Link href={"/login"}>Login</Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar
