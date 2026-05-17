import React, { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import PageLoader from "../components/common/PageLoader"
import BootstrapTooltip from "../components/BootstrapTooltip"

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <Toaster position="top-center" />

            <PageLoader />
            <BootstrapTooltip />
            {children}
        </>
    )
}

export default Layout
