"use client"
import LoginSwiperSection from "@/app/components/common/LoginSwiperSection"
import { loadRecaptcha, removeRecaptcha } from "@/utils/Helpers"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"
import toast from "react-hot-toast"
const Toaster = dynamic(() => import("react-hot-toast").then(({ Toaster }) => Toaster), {
    ssr: false,
})

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Load Google reCAPTCHA script when the layout mounts, and clean up by removing it when the layout unmounts.
    useEffect(() => {
        loadRecaptcha()
        return () => {
            removeRecaptcha()
        }
    }, [])
    toast.remove()
    const pathName = usePathname()
    const isSignUpPage = pathName.includes("signup")
    return (
        // <ErrorBoundary>
        <>
            <Toaster position="top-center" />
            <div className="sign-in-layout w-lg-500px p-10 m-auto">
                <LoginSwiperSection />
                <div className="w-100 h-100 container flex-center sign-in-form">
                    <div className={`${isSignUpPage ? "sign-up-form" : "w-500px"}`}>
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
