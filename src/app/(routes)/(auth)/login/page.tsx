"use client"
import OTPModal from "@/app/components/auth/OTPModal"
import TextInputField from "@/app/components/common/TextInput"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { showSweetAlertWithRedirect } from "@/utils/helpers"
import { LoginSchema, LoginValidationSchema } from "@/validations/auth/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { NextPage } from "next"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Spinner } from "react-bootstrap"
import { useForm } from "react-hook-form"
import GoogleLogo from "../../../../../public/images/Google-logo.svg"

const Login: NextPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const [googleLoginStart, setGoogleLoginStart] = useState(false)
    const [showOtpModal, setShowOtpModal] = useState(false)
    const redirectUrl = searchParams.get(CONFIG.PARAMS.REDIRECT_URL_PARAM) || "/profile"
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
    } = useForm<LoginSchema>({ resolver: zodResolver(LoginValidationSchema) })

    const submitHandler = async (data: LoginSchema) => {
        try {
            // signin with AWS cognito
            // await signOut({ global: true })
            // const cognitoUser = await signIn({ username: data.email, password: data.password })
            // if (
            //     cognitoUser &&
            //     cognitoUser.nextStep.signInStep ===
            //         CONFIG.COGNITO_CHALLENGE_NAME.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED
            // ) {
            //     router.push("/set-new-password")
            // } else if (
            //     cognitoUser &&
            //     cognitoUser.nextStep.signInStep === CONFIG.COGNITO_CHALLENGE_NAME.CONFIRM_SIGN_UP
            // ) {
            //     setShowOtpModal(true)
            // } else {
            //     const session = await fetchAuthSession()
            //     const accessToken = session?.tokens?.accessToken?.toString()
            //     // if jwt received then check whether user exist in db or not
            //     if (accessToken) {
            //         setAccessToken(accessToken)
            //         const response = await FetchHelper.get(CONFIG.API_ENDPOINTS.GET_USER_BY_TOKEN)
            //         // if user exists then set the cookie and redirect
            //         if (response && response.data && response.status) {
            //             toast(CONFIG.MESSAGES.USER_LOGIN_SUCCESS, CONFIG.TOASTER_OPTIONS.SUCCESS)
            //             router.push(redirectUrl)
            //         }
            //         // else show error
            //         else {
            //             handleError(response)
            //         }
            //     } else {
            //         toast(CONFIG.MESSAGES.GENERIC_ERROR, CONFIG.TOASTER_OPTIONS.ERROR)
            //     }
            // }
            const response = await signIn("credentials", {
                ...data,
                redirect: false,
            })
            if (response?.ok && response?.status === 200) {
                // Store the access token in localStorage
                const session = await fetch("/api/auth/session").then((res) => res.json())
                const accessToken = session?.accessToken
                if (accessToken) {
                    console.log("🚀 ~ submitHandler ~ accessToken:", accessToken)
                    localStorage.setItem(CONFIG.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN, accessToken)
                    showSweetAlertWithRedirect({
                        icon: ALERT_ICON_TYPE.success,
                        text: CONFIG.MESSAGES.USER_LOGIN_SUCCESS,
                        router,
                        url: redirectUrl,
                    })
                }

                // Redirect to dashboard or another page
                // router.push("/")
            } else {
                handleError(response?.error)
            }
        } catch (error) {
            console.log(error)
            // const cognitoException = JSON.parse(JSON.stringify(error))
            // if (cognitoException.code === 'UserNotConfirmedException') {
            //     //? Addition Functionality
            // here we can send OTP to user regarding account confirmation
            // then we require OTP confi    rmation Popup
            // } else {
            //     toast(CONFIG.MESSAGES.INVALID_LOGIN_CREDENTIALS, CONFIG.TOASTER_OPTIONS.ERROR)
            // }
            handleError(error)
        }
    }
    // const login = async () => {
    //     try {
    //         setGoogleLoginStart(true)
    //         await signInWithRedirect({ provider: CONFIG.COGNITO_AUTH_PROVIDERS.GOOGLE })
    //     } catch (error) {
    //         console.log(error)
    //         handleError(error)
    //         setGoogleLoginStart(false)
    //     }
    // }
    return (
        <section className="v-login-section v-section-padding">
            <div className="container-fluid">
                <div className="v-form-container">
                    <div className="v-login w-50">
                        <div className="v-tagline">
                            <h1>Login</h1>
                        </div>
                        <div className="v-google-login-btn">
                            <button
                                className="v-plane-btn-hover"
                                onClick={async () => {
                                    const response = await signIn("google", {
                                        redirect: true,
                                        callbackUrl: "/components",
                                    })
                                    console.log("🚀 ~ onClick ~ response:", response)
                                }}
                            >
                                <Image src={GoogleLogo} alt="google-logo" />
                                <span>Login with Google</span>
                                {googleLoginStart ? <Spinner variant="dark" /> : ""}
                            </button>
                        </div>
                        <div className="v-hr-row">
                            <hr />
                            <span>Or Log in with</span>
                            <hr />
                        </div>
                        <div className="v-form-content">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="v-form-group mt-0">
                                    <TextInputField
                                        label="Email"
                                        errorMsg={errors?.email?.message}
                                        placeholder="E.g. youremail@email.com"
                                        required
                                        {...register("email")}
                                    />
                                </div>
                                <div className="v-form-group">
                                    <TextInputField
                                        label="Password"
                                        errorMsg={errors?.password?.message}
                                        placeholder="E.g. youremail@email.com"
                                        required
                                        type="password"
                                        {...register("password")}
                                    />
                                    <div className="v-forgot-password">
                                        <Link href={"/forgot-password"}>Forgot password?</Link>
                                    </div>
                                </div>
                                <div className="v-form-group">
                                    <button
                                        type="submit"
                                        className={`v-submit-btn ${
                                            isSubmitting ? "" : " v-fill-btn-hover"
                                        }`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? <Spinner variant="light" /> : "Login"}
                                    </button>
                                </div>
                                <div className="v-signup">
                                    <p>
                                        Don&apos;t have an account?&nbsp;
                                        <Link href={"/signup"}>Signup</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <OTPModal
                show={showOtpModal}
                setShow={setShowOtpModal}
                email={getValues("email")}
                password={getValues("password")}
            />
        </section>
    )
}

export default Login
