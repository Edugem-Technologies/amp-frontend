"use client"
import { usePermissions } from "@/app/context/PermissionContext"
import { AuthMethodEnum, LoginTypeEnum } from "@/enums/LoginTypeEnum"
import { FetchHelper } from "@/services/fetch-helper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import {
    executeWithRecaptcha,
    setLoginDetailsToLocalStorage,
    showSweetAlertWithRedirect,
} from "@/utils/helpers"
import {
    EmailOTPLoginSchema,
    EmailPasswordLoginSchema,
    LoginSchemaType,
    PhoneOTPLoginSchema,
    PhonePasswordLoginSchema,
} from "@/validations/auth/Login"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CustomButton from "../button/Button"
import PrimaryButton from "../button/PrimaryButton"
import RadioInput from "../input/RadioInput"
import EmailOTPLogin from "./EmailOTPLogin"
import EmailPasswordLogin from "./EmailPasswordLogin"
import PhoneOTPLogin from "./PhoneOTPLogin"
import PhonePasswordLogin from "./PhonePasswordLogin"

/**
 * LoginFormSwitcher is a React component that provides a dynamic login form
 * allowing users to switch between different authentication methods:
 * - Email + Password
 * - Email + OTP
 * - Phone + Password
 * - Phone + OTP
 *
 * Features:
 * - Users can toggle between "Email" and "Phone" login types.
 * - For each login type, users can choose between "Password" and "OTP" authentication methods.
 * - The form dynamically renders the appropriate input fields and validation schema based on the selected method.
 * - On submit, the form sends login credentials to the backend and handles success or error responses.
 * - On successful login, user permissions and details are stored, and the user is redirected.
 * - Includes links for account creation and password recovery.
 * - Uses React Hook Form for form state management and Zod for schema validation.
 *
 * @component
 * @returns {JSX.Element} The rendered login form switcher UI.
 */
const LoginFormSwitcher = () => {
    const { setUserPermissions } = usePermissions()
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectUrl = searchParams.get("redirectUrl") || "/"
    const [loginType, setLoginType] = useState<LoginTypeEnum>(LoginTypeEnum.EMAIL)
    const [authMethod, setAuthMethod] = useState<AuthMethodEnum>(AuthMethodEnum.PASSWORD)

    let schema, formType: string
    // Pick the schema and type based on state
    switch (`${loginType}-${authMethod}`) {
        case `${LoginTypeEnum.EMAIL}-${AuthMethodEnum.PASSWORD}`:
            schema = EmailPasswordLoginSchema
            formType = "emailPassword"
            break
        case `${LoginTypeEnum.EMAIL}-${AuthMethodEnum.OTP}`:
            schema = EmailOTPLoginSchema
            formType = "emailOTP"
            break
        case `${LoginTypeEnum.PHONE}-${AuthMethodEnum.PASSWORD}`:
            schema = PhonePasswordLoginSchema
            formType = "phonePassword"
            break
        case `${LoginTypeEnum.PHONE}-${AuthMethodEnum.OTP}`:
            schema = PhoneOTPLoginSchema
            formType = "phoneOTP"
            break
        default:
            schema = EmailPasswordLoginSchema // fallback
            formType = "emailPassword"
    }
    // Maps each login form type to its corresponding default field values for form reset.
    const defaultValuesMap = {
        emailPassword: { primary_email: "", password: "" },
        emailOTP: { primary_email: "", otp: "" },
        phonePassword: { primary_phone: "", country_code: "", password: "" },
        phoneOTP: { primary_phone: "", country_code: "", otp: "" },
    }

    // Create the hookForm instance
    const hookForm = useForm<LoginSchemaType>({
        resolver: zodResolver(schema),
        mode: "onSubmit",
    })

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = hookForm

    const submitHandler = async (data: LoginSchemaType) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            // We use grecaptcha to prevent automated abuse and ensure that the login request is made by a real user.
            executeWithRecaptcha(async () => {
                const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.LOGIN, data)
                if (response?.status) {
                    setLoginDetailsToLocalStorage({
                        permissions: response.data.permissions,
                        roles: response.data.roles,
                        setUserPermissions,
                        userDetails: response.data.user,
                    })
                    showSweetAlertWithRedirect({
                        text: response.message,
                        icon: ALERT_ICON_TYPE.success,
                        router,
                        url: redirectUrl,
                    })
                }
            })
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
        // Reset the form whenever loginType or authMethod changes
        hookForm.reset(defaultValuesMap[formType as keyof typeof defaultValuesMap])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginType, authMethod])

    useEffect(() => {
        // Reset the authMethod when loginType changes
        setAuthMethod(AuthMethodEnum.PASSWORD)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginType])

    return (
        <div>
            {/* Top Switch: Email or Phone */}
            <div className="login-type-section">
                <CustomButton
                    customClassName={`login-type-section-btn ${
                        loginType === LoginTypeEnum.EMAIL ? "active" : ""
                    }`}
                    buttonTitle="Email"
                    onClick={() => setLoginType(LoginTypeEnum.EMAIL)}
                />
                <CustomButton
                    customClassName={`login-type-section-btn ${
                        loginType === LoginTypeEnum.PHONE ? "active" : ""
                    }`}
                    buttonTitle="Phone"
                    onClick={() => setLoginType(LoginTypeEnum.PHONE)}
                />
            </div>

            {/* Second Switch: Password or OTP */}
            <div className="auth-method-section">
                <RadioInput
                    containerClassName="auth-method-section-btn"
                    name="authMethod"
                    label="Password"
                    id="password-auth"
                    value={AuthMethodEnum.PASSWORD}
                    checked={authMethod === AuthMethodEnum.PASSWORD}
                    onChange={() => setAuthMethod(AuthMethodEnum.PASSWORD)}
                />
                <RadioInput
                    containerClassName="auth-method-section-btn"
                    name="authMethod"
                    label="OTP"
                    id="otp-auth"
                    value={AuthMethodEnum.OTP}
                    checked={authMethod === AuthMethodEnum.OTP}
                    onChange={() => setAuthMethod(AuthMethodEnum.OTP)}
                />
            </div>

            {/* Render the correct form */}
            <form className="form w-100" onSubmit={handleSubmit(submitHandler)}>
                {loginType === LoginTypeEnum.EMAIL && authMethod === AuthMethodEnum.PASSWORD && (
                    <EmailPasswordLogin hookForm={hookForm} />
                )}
                {loginType === LoginTypeEnum.EMAIL && authMethod === AuthMethodEnum.OTP && (
                    <EmailOTPLogin hookForm={hookForm} />
                )}
                {loginType === LoginTypeEnum.PHONE && authMethod === AuthMethodEnum.PASSWORD && (
                    <PhonePasswordLogin hookForm={hookForm} />
                )}
                {loginType === LoginTypeEnum.PHONE && authMethod === AuthMethodEnum.OTP && (
                    <PhoneOTPLogin hookForm={hookForm} />
                )}
                <div className="d-flex gap-2 justify-content-between mb-4">
                    <Link className="font-size-14px" href="/auth/signup">
                        Create an account
                    </Link>
                    <Link className="font-size-14px" href="/auth/forgot-password">
                        Forgot Password?
                    </Link>
                </div>

                <div className="d-grid border-radius-10px">
                    <PrimaryButton type="submit" isSubmitting={isSubmitting} buttonTitle="Login" />
                </div>
            </form>
        </div>
    )
}

export default LoginFormSwitcher
