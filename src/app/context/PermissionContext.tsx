"use client"
import React, { createContext, useContext, useState } from "react"

interface PermissionContextType {
    userPermissions: string[]
    setUserPermissions: (permissions: string[]) => void
}

// Initialize the context with a default value
const defaultPermissionContext: PermissionContextType = {
    userPermissions: [],
    setUserPermissions: () => {},
}

const PermissionContext = createContext<PermissionContextType>(defaultPermissionContext)

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userPermissions, setUserPermissions] = useState<string[]>([])
    return (
        <PermissionContext.Provider value={{ userPermissions, setUserPermissions }}>
            {children}
        </PermissionContext.Provider>
    )
}

export const usePermissions = () => {
    const context = useContext(PermissionContext)
    if (!context) {
        console.log("usePermissions must be used within a PermissionProvider")
        throw new Error("usePermissions must be used within a PermissionProvider")
    }
    return context
}
