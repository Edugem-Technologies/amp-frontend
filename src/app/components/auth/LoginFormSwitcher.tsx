"use client"
import { AuthMethodEnum, LoginTypeEnum } from "@/enums/LoginTypeEnum"
import { useState } from "react"
import CustomButton from "../button/Button"
import EmailOTPLogin from "./EmailOTPLogin"
import EmailPasswordLogin from "./EmailPasswordLogin"
import PhoneOTPLogin from "./PhoneOTPLogin"
import PhonePasswordLogin from "./PhonePasswordLogin"
import RadioInput from "../input/RadioInput"
// import CustomButton from "../button/Button"

const LoginFormSwitcher = () => {
    const [loginType, setLoginType] = useState<LoginTypeEnum>(LoginTypeEnum.EMAIL)
    const [authMethod, setAuthMethod] = useState<AuthMethodEnum>(AuthMethodEnum.PASSWORD)

    return (
        <div>
            {/* Top Switch: Email or Phone */}
            <div className="login-type-section">
                <CustomButton
                    customClassName="login-type-section-btn"
                    buttonTitle="Email"
                    onClick={() => setLoginType(LoginTypeEnum.EMAIL)}
                    style={{
                        fontWeight: loginType === "email" ? "bold" : "normal",
                    }}
                />
                <CustomButton
                    customClassName="login-type-section-btn"
                    buttonTitle="Phone"
                    onClick={() => setLoginType(LoginTypeEnum.PHONE)}
                    style={{
                        fontWeight: loginType === "phone" ? "bold" : "normal",
                    }}
                />
            </div>

            {/* Second Switch: Password or OTP */}
            <div className="auth-method-section">
                <RadioInput
                    name="authMethod"
                    label="Password"
                    value={AuthMethodEnum.PASSWORD}
                    defaultChecked={authMethod === AuthMethodEnum.PASSWORD}
                    onChange={() => setAuthMethod(AuthMethodEnum.PASSWORD)}
                />
                <RadioInput
                    name="authMethod"
                    label="OTP"
                    value={AuthMethodEnum.OTP}
                    defaultChecked={authMethod === AuthMethodEnum.OTP}
                    onChange={() => setAuthMethod(AuthMethodEnum.OTP)}
                />
            </div>

            {/* Render the correct form */}
            {loginType === "email" && authMethod === "password" && <EmailPasswordLogin />}
            {loginType === "email" && authMethod === "otp" && <EmailOTPLogin />}
            {loginType === "phone" && authMethod === "password" && <PhonePasswordLogin />}
            {loginType === "phone" && authMethod === "otp" && <PhoneOTPLogin />}
        </div>
    )
}

export default LoginFormSwitcher
