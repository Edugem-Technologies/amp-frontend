import React, { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <Toaster position="top-center" />
            {children}
        </>
    )
}

export default Layout
