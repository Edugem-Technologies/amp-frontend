"use client"
import { useAppContext } from "@/app/context/AppContext"
import { FetchHelper } from "@/services/FetchHelper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/Constants"
import { handleError } from "@/utils/HandleError"
import {
    getDecryptedSessionStorageData,
    removeIsAuthenticated,
    showSweetAlert,
    showSweetAlertWithRedirect,
} from "@/utils/Helpers"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, ListGroup } from "react-bootstrap"

const UserDropdown = () => {
    const router = useRouter()
    const { user } = useAppContext()
    const [showDropdown, setShowDropdown] = useState(false)
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
    const [profileImageURL, setProfileImageURL] = useState<string | null>(null)

    const setCustomTimeout = (ms: number, cb: () => void) => {
        if (timerId) {
            clearTimeout(timerId)
        }
        const id = setTimeout(() => cb(), ms)
        setTimerId(id)
    }
    const removeCustomTimeout = (cb?: () => void) => {
        if (timerId) {
            clearTimeout(timerId)
        }
        if (cb) {
            cb()
        }
    }
    const handleLogout = async () => {
        try {
            const result = await showSweetAlert({
                icon: ALERT_ICON_TYPE.warning,
                text: CONFIG.MESSAGES.CONFIRM_LOGOUT,
                cancelButtonText: CONFIG.SWEETALERT_LOGOUT_OPTION.cancelButtonText,
                subtitle: false,
            })
            if (result.isConfirmed) {
                const response = await FetchHelper.get(CONFIG.API_ENDPOINTS.LOGOUT)
                if (response.status) {
                    removeIsAuthenticated()
                    showSweetAlertWithRedirect({
                        icon: ALERT_ICON_TYPE.success,
                        text: response.message,
                        router,
                        url: "/auth/login",
                    })
                }
            }
        } catch (error) {
            handleError(error)
        }
    }
    useEffect(() => {
        return () => {
            if (timerId) {
                clearTimeout(timerId)
            }
        }
    })
    useEffect(() => {
        setProfileImageURL(
            getDecryptedSessionStorageData(CONFIG.SESSION_STORAGE_VARIABLES.PROFILE_IMAGE_URL),
        )
    }, [user])

    /**
     * Call this function after updating the profile image in sessionStorage
     * to notify all listeners in the current tab.
     * Example: window.dispatchEvent(new Event("profileImageChanged"))
     */

    return (
        <div
            className="profile-container"
            onMouseEnter={() => {
                setShowDropdown(true)
            }}
            onMouseLeave={() => {
                setCustomTimeout(250, () => setShowDropdown(false))
            }}
        >
            {/* Profile Icon */}
            <img
                src={
                    profileImageURL ??
                    "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                }
                onError={() => {
                    setProfileImageURL(null)
                }}
                alt="Profile Icon"
                className="profile-icon"
            />

            {/* Dropdown Card */}
            {showDropdown && (
                <Card
                    className="shadow-sm dropdown-card"
                    onMouseEnter={() => {
                        removeCustomTimeout(() => setShowDropdown(true))
                    }}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Card.Title>
                                {user?.first_name ?? ""} {user?.last_name ?? ""}
                            </Card.Title>
                            <Card.Text>{user?.primary_email}</Card.Text>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            className="cursor-pointer"
                            onClick={() =>
                                router.push(
                                    `/users/${user?.uuid}/${CONFIG.EDIT_USER_STEP_TABS.details.path}`,
                                )
                            }
                        >
                            My Profile
                        </ListGroup.Item>
                        <ListGroup.Item action className="cursor-pointer" onClick={handleLogout}>
                            Logout
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            )}
        </div>
    )
}

export default UserDropdown
