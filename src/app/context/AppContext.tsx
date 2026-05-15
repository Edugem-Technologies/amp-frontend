"use client"
import { User } from "@/types/auth/User"
import { AnyObject } from "@/types/common/Helper"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
// import { useMediaQuery } from "../hooks/useMediaQuery"
import { CONFIG } from "@/utils/Constants"
import { usePathname } from "next/navigation"
import { Option } from "@/types/components/ReactSelect"

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
    selectedRoadmaps: Option[]
    setSelectedRoadmaps: Dispatch<SetStateAction<Option[]>>
    isCatActive: boolean
    setIsCatActive: Dispatch<SetStateAction<boolean>>
    isTimerActive: boolean
    setIsTimerActive: Dispatch<SetStateAction<boolean>>
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
    activeSlider: "favourites" | "requests" | "assistant" | "mirrored" | null
    setActiveSlider: Dispatch<
        SetStateAction<"favourites" | "requests" | "assistant" | "mirrored" | null>
    >
    toggleSlider: (
        type: Exclude<"favourites" | "requests" | "assistant" | "mirrored" | null, null>,
    ) => void
    closeSlider: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
    children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const pathname = usePathname()
    const [state, setState] = useState("Hello from context")
    // const matched = useMediaQuery("(max-width: 768px)")
    const [sidebarCollapse, setSidebarCollapse] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const [filterState, setFilterState] = useState<AnyObject | null | undefined>(null)
    const [layout, setLayout] = useState<string>(
        pathname === CONFIG.PAGES.ROADMAPS ? CONFIG.LAYOUT.HORIZONTAL : CONFIG.LAYOUT.COLUMNS,
    )
    const [isCatActive, setIsCatActive] = useState<boolean>(false)
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false)
    const [selectedRoadmaps, setSelectedRoadmaps] = useState<Option[]>([])
    const [activeSlider, setActiveSlider] = useState<
        "favourites" | "requests" | "assistant" | "mirrored" | null
    >(null)
    const toggleSlider = (type: "favourites" | "requests" | "assistant" | "mirrored") => {
        setActiveSlider((prev) => {
            if (prev === type) return null
            return type
        })
    }

    const closeSlider = () => {
        setActiveSlider(null)
    }

    const [show, setShow] = useState(false)

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
                selectedRoadmaps,
                setSelectedRoadmaps,
                isCatActive,
                setIsCatActive,
                isTimerActive,
                setIsTimerActive,
                // handleBottomMenuClick,
                // activeBottomMenu,
                // isBottomDrawerOpen,
                // setActiveBottomMenu,
                activeSlider,
                setActiveSlider,
                show,
                setShow,
                toggleSlider,
                closeSlider,
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
