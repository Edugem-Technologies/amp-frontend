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
import { useEffect, useState, useRef } from "react"

const UserDropdown = () => {
    const router = useRouter()
    const { user } = useAppContext()
    const [open, setOpen] = useState(false)
    const [profileImageURL, setProfileImageURL] = useState<string | null>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setProfileImageURL(
            getDecryptedSessionStorageData(CONFIG.SESSION_STORAGE_VARIABLES.PROFILE_IMAGE_URL),
        )
    }, [user])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

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

    const firstLetter = user?.first_name?.charAt(0)?.toUpperCase() ?? "M"

    return (
        <div className="user-dropdown" ref={wrapperRef}>
            {/* Trigger */}
            <div className="user-trigger mx-1" onClick={() => setOpen((p) => !p)}>
                <span className="user-name">{user?.first_name ?? "Mark"}</span>
                <div className="user-avatar">{firstLetter}</div>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="user-menu">
                    <div className="user-info">
                        <img
                            src={
                                profileImageURL ??
                                "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?w=300"
                            }
                            onError={() => setProfileImageURL(null)}
                            alt="profile"
                        />
                        <div>
                            <div className="name">
                                {user?.first_name} {user?.last_name}
                            </div>
                        </div>
                    </div>

                    <ul>
                        <li>Favourites</li>
                        <li>Requests</li>
                        <li>Assistant</li>

                        <li className="divider" />

                        <li>Settings</li>
                        <li onClick={handleLogout}>Sign Out</li>

                        <li className="divider" />

                        <li className="highlight">Create Fence</li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default UserDropdown
