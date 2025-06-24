"use client"
import UserInfo from "@/app/components/auth/UserInfo"
import CustomSkeleton from "@/app/components/common/CustomSkeleton"
import { FetchHelper } from "@/services/fetch-helper"
import { User } from "@/types/auth/User"
import { CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * SingleUser component is responsible for fetching and displaying the details of a single user.
 * It shows a loading skeleton while data is being fetched and renders the user information once available.
 * If an invalid tab is accessed, it redirects to a 404 page.
 */
const SingleUser = () => {
    // State variables for user data and loading status
    const [userData, setuserData] = useState<User>()
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const userId = params.id as string
    const [refetch, setRefetch] = useState(false)

    /**
     * Fetches user data by user ID and updates state accordingly.
     * Displays loading state while fetching and handles errors gracefully.
     */

    const getUserById = async () => {
        try {
            setLoading(true)
            const url = new URL(`${CONFIG.API_ENDPOINTS.GET_USER_BY_TOKEN}`)
            const response = await FetchHelper.get(url, {
                user__uuid: userId,
                page: 1,
                size: 10,
            })
            if (response?.result[0]) {
                setuserData(response.result[0])
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refetch])
    return (
        <div className="container-fluid">
            {loading ? (
                <CustomSkeleton stopHorizontalScrolling={true} rowCount={5} />
            ) : (
                !!userData && <UserInfo userInfo={userData} setRefetch={setRefetch} />
            )}
        </div>
    )
}

export default SingleUser
