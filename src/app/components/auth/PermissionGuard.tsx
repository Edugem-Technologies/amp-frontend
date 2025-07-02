import { usePermissions } from "@/app/context/PermissionContext"
import { hasAccessPermission } from "@/utils/Helpers"
import React from "react"
import AccessDenied from "./AccessDenied"

interface PermissionGuardProps {
    requiredPermissions: string[]
    children: React.ReactNode
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({ requiredPermissions, children }) => {
    const { userPermissions } = usePermissions()

    const hasPermission =
        userPermissions.length > 0 && hasAccessPermission({ requiredPermissions, userPermissions })

    if (!hasPermission) {
        return <AccessDenied /> // Render access denied if the user doesn't have the required permissions
    }

    return <>{children}</> // Render children if the user has the required permissions
}

export default PermissionGuard
