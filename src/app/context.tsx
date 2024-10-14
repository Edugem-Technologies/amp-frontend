"use client"
import { createContext, useState, ReactNode } from "react"

// Define the type for your context state
interface MyContextType {
    state: string
    setState: (value: string) => void
}

// Create the context with a default value
const MyContext = createContext<MyContextType | undefined>(undefined)

// Create a provider component
interface MyProviderProps {
    children: ReactNode
}

export const MyProvider = ({ children }: MyProviderProps) => {
    const [state, setState] = useState("Hello from context")

    return <MyContext.Provider value={{ state, setState }}>{children}</MyContext.Provider>
}

export default MyContext
