"use client"
import AuthGuard from "@/app/components/auth/AuthGuard"
import { useAppContext } from "@/app/context/AppContext"
import { usePermissions } from "@/app/context/PermissionContext"
import { CONFIG } from "@/utils/Constants"
import { generateSecureKey, getDecryptedLocalStorageData } from "@/utils/Helpers"
import React, { ReactNode, useEffect } from "react"

const Template: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { setUserPermissions } = usePermissions()
    const { setUser } = useAppContext()

    /**
     * This useEffect is responsible for synchronizing the user's permissions and user data
     * between different browser tabs/windows. It does this by:
     * 1. Reading the current permissions and user data from localStorage when the component mounts,
     *    and updating the app context accordingly.
     * 2. Adding an event listener for the "storage" event, which is triggered when localStorage
     *    changes in another tab or window. If the "permissions" or "user_data" keys are changed,
     *    it updates the app context in the current tab to reflect those changes.
     * 3. Cleaning up the event listener when the component unmounts.
     */
    useEffect(() => {
        const setPermission = () => {
            const permissions = getDecryptedLocalStorageData(
                CONFIG.LOCAL_STORAGE_VARIABLES.PERMISSIONS,
            )
            if (permissions) {
                // set permission whenever it changes in local host
                setUserPermissions(permissions)
            } else {
                setUserPermissions([])
            }
        }
        const setUserData = () => {
            const user = getDecryptedLocalStorageData(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DATA)
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        }
        // This function listens for changes to localStorage in other browser tabs/windows.
        // If the "permissions" or "user_data" keys are changed (e.g., user logs in/out elsewhere),
        // it updates the permissions and user data in the current tab accordingly.
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === generateSecureKey(CONFIG.LOCAL_STORAGE_VARIABLES.PERMISSIONS)) {
                setPermission()
            }
            if (event.key === generateSecureKey(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DATA)) {
                setUserData()
            }
        }
        setPermission()
        setUserData()

        // Attach the listener
        window.addEventListener("storage", handleStorageChange)

        // Cleanup the listener on unmount
        return () => {
            window.removeEventListener("storage", handleStorageChange)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <AuthGuard>
            <div className="position-relative z-index-1 mt-3 mx-3">{children}</div>
        </AuthGuard>
    )
}

export default Template
