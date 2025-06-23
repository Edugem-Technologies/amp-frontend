"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { UserWithRole } from "@/types/auth/user"

// Define the type for your context state
interface AppContextType {
    state: string
    setState: (value: string) => void
    sidebarCollapse: boolean
    setSidebarCollapse: Dispatch<SetStateAction<boolean>>
    user: UserWithRole | null
    setUser: Dispatch<SetStateAction<UserWithRole | null>>
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined)

// Create a provider component
interface AppProviderProps {
    children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [state, setState] = useState("Hello from context")
    const matched = useMediaQuery("(max-width: 768px)")
    const [sidebarCollapse, setSidebarCollapse] = useState(matched)
    const [user, setUser] = useState<UserWithRole | null>(null)

    return (
        <AppContext.Provider
            value={{ state, setState, sidebarCollapse, setSidebarCollapse, setUser, user }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("Context must be wrapped in a context provider")
    }
    return context
}

export default AppContext
