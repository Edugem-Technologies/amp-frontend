"use client"
import { User } from "@/types/auth/User"
import { AnyObject } from "@/types/common/Helper"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { CONFIG } from "@/utils/Constants"

// Define the type for your context state
interface AppContextType {
    state: string
    setState: (value: string) => void
    sidebarCollapse: boolean
    setSidebarCollapse: Dispatch<SetStateAction<boolean>>
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
    filterState: AnyObject | null | undefined
    setFilterState: Dispatch<SetStateAction<AnyObject | null | undefined>>
    setLayout?: Dispatch<SetStateAction<string>>
    layout?: string
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
    const [user, setUser] = useState<User | null>(null)
    const [filterState, setFilterState] = useState<AnyObject | null | undefined>(null)
    const [layout, setLayout] = useState<string>(CONFIG.LAYOUT.VERTICAL)

    return (
        <AppContext.Provider
            value={{
                state,
                setState,
                sidebarCollapse,
                setSidebarCollapse,
                setUser,
                user,
                filterState,
                setFilterState,
                layout,
                setLayout,
            }}
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
