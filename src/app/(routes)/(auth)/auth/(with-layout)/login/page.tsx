"use client"

import AuthHeader from "@/app/components/auth/AuthHeader"
import LoginFormSwitcher from "@/app/components/auth/LoginFormSwitcher"
import SocialLogin from "@/app/components/auth/SocialLogin"
import { CONFIG } from "@/utils/constants"

const Login = () => {
    return (
        <form className="form w-100">
            <AuthHeader title={CONFIG.LOG_IN_TITLE} />
            <LoginFormSwitcher />
            {/* <LoginForm hookForm={hookForm} /> */}
            <SocialLogin />
        </form>
    )
}

export default Login
