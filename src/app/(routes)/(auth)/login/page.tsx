"use client"
import OTPModal from "@/app/components/auth/OTPModal"
import TextInputField from "@/app/components/common/TextInput"
import { AnyObject } from "@/types/common/helper"
import { setAccessToken } from "@/utils/common"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { showSweetAlertWithRedirect } from "@/utils/helpers"
import { LoginSchema, LoginValidationSchema } from "@/validations/auth/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { NextPage } from "next"
import { getSession, signIn } from "next-auth/react"
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
            const response = await signIn("credentials", {
                ...data,
                redirect: false,
            })
            if (response?.ok && response?.status === 200) {
                // Retrieve the current session details using NextAuth's `getSession` method
                const session = await getSession()
                // Extract the access token from the session data
                const accessToken = (session as AnyObject)?.data?.data?.token
                if (accessToken) {
                    // Save the access token in local storage
                    setAccessToken(accessToken)
                    // Show a success alert and redirect the user to the specified URL
                    showSweetAlertWithRedirect({
                        icon: ALERT_ICON_TYPE.success,
                        text: CONFIG.MESSAGES.USER_LOGIN_SUCCESS,
                        router,
                        url: redirectUrl,
                    })
                } else {
                    // Throw an error if the access token is not found in the session data t show toaster or sweetalert
                    throw (session as AnyObject)?.data
                }
            }
        } catch (error) {
            handleError(error)
        }
    }
    return (
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
                                try {
                                    await signIn("google", {
                                        redirect: true,
                                        callbackUrl: redirectUrl,
                                    })
                                } catch (error) {
                                    handleError(error)
                                }
                            }}
                        >
                            <Image src={GoogleLogo} alt="google-logo" />
                            <span>Login with Google</span>
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
            <OTPModal
                show={showOtpModal}
                setShow={setShowOtpModal}
                email={getValues("email")}
                password={getValues("password")}
            />
        </div>
    )
}

export default Login
