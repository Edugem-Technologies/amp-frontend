import React, { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import PageLoader from "../components/common/PageLoader"

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <Toaster position="top-center" />
            <PageLoader />
            {children}
        </>
    )
}

export default Layout
