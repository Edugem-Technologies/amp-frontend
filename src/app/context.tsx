"use client"
import { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from "react"
import { useMediaQuery } from "./hooks/useMediaQuery"

// Define the type for your context state
interface AppContextType {
    state: string
    setState: (value: string) => void
    sidebarCollapse: boolean
    setSidebarCollapse: Dispatch<SetStateAction<boolean>>
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

    return (
        <AppContext.Provider value={{ state, setState, sidebarCollapse, setSidebarCollapse }}>
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
