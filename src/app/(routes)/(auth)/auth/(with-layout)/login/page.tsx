"use client"

import AuthHeader from "@/app/components/auth/AuthHeader"
import LoginFormSwitcher from "@/app/components/auth/LoginFormSwitcher"
import SocialLogin from "@/app/components/auth/SocialLogin"
import { CONFIG } from "@/utils/Constants"

const Login = () => {
    return (
        <>
            <AuthHeader title={CONFIG.LOG_IN_TITLE} />
            <LoginFormSwitcher />
            <SocialLogin />
        </>
    )
}

export default Login
