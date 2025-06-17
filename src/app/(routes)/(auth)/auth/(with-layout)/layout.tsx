"use client"
import LoginSwiperSection from "@/app/components/common/LoginSwiperSection"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"
const Toaster = dynamic(() => import("react-hot-toast").then(({ Toaster }) => Toaster), {
    ssr: false,
})

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    toast.remove()
    const pathName = usePathname()
    const isSignUpPage = pathName.includes("signup")
    return (
        // <ErrorBoundary>
        <>
            <Toaster position="top-center" />
            <div className="sign-in-layout w-lg-500px p-10 m-auto">
                <LoginSwiperSection />
                <div className="w-100 container flex-center sign-in-form">
                    <div className={`${isSignUpPage ? "h-100 sign-up-form" : "w-500px"}`}>
                        <img
                            className="logo-image"
                            src="/images/logos/logo.png"
                            alt="boiler-plate-logo"
                        />

                        {children}
                    </div>
                </div>
            </div>
        </>
        // </ErrorBoundary>
    )
}

export default Layout
