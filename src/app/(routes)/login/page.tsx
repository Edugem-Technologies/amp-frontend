"use client"
import OTPModal from "@/app/components/auth/OTPModal"
import { doGetUserByAccessToken } from "@/services/user"
import { config } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { LoginSchema, LoginValidationSchema } from "@/validations/auth/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { fetchAuthSession, signIn, signInWithRedirect, signOut } from "aws-amplify/auth"
import { setCookie } from "cookies-next"
import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useState } from "react"
import { Spinner } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import EyeClose from "../../../../public/images/Eye-close.svg"
import EyeOpen from "../../../../public/images/Eye-open.svg"
import GoogleLogo from "../../../../public/images/Google-logo.svg"
import WithoutAuth from "../../components/auth/WithoutAuth"
import CustomLayout from "../../components/common/CustomLayout"
import TextInputField from "@/app/components/common/TextInput"

const Login: NextPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [googleLoginStart, setGoogleLoginStart] = useState(false)
    const [showOtpModal, setShowOtpModal] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const redirectUrl = searchParams.get(config.PARAMS.REDIRECT_URL_PARAM) || "/profile"
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
    } = useForm<LoginSchema>({ resolver: zodResolver(LoginValidationSchema) })
    const togglePasswordField = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowPassword((prev) => !prev)
    }
    const submitHandler = async (data: LoginSchema) => {
        try {
            // signin with AWS cognito
            await signOut({ global: true })
            const cognitoUser = await signIn({ username: data.email, password: data.password })
            if (
                cognitoUser &&
                cognitoUser.nextStep.signInStep ===
                    config.COGNITO_CHALLENGE_NAME.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED
            ) {
                router.push("/set-new-password")
            } else if (
                cognitoUser &&
                cognitoUser.nextStep.signInStep === config.COGNITO_CHALLENGE_NAME.CONFIRM_SIGN_UP
            ) {
                setShowOtpModal(true)
            } else {
                const session = await fetchAuthSession()
                const accessToken = session?.tokens?.accessToken?.toString()
                // if jwt received then check whether user exist in db or not
                if (accessToken) {
                    const response = await doGetUserByAccessToken(accessToken)
                    // if user exists then set the cookie and redirect
                    if (response && response.data && response.status) {
                        toast(config.MESSAGES.USER_LOGIN_SUCCESS, config.TOASTER_OPTIONS.SUCCESS)
                        setCookie(config.AUTH.COOKIE_NAME, accessToken)
                        router.push(redirectUrl)
                    }
                    // else show error
                    else {
                        handleError(response)
                    }
                } else {
                    toast(config.MESSAGES.GENERIC_ERROR, config.TOASTER_OPTIONS.ERROR)
                }
            }
        } catch (error) {
            console.log(error)
            // const cognitoException = JSON.parse(JSON.stringify(error))
            // if (cognitoException.code === 'UserNotConfirmedException') {
            //     //? Addition Functionality
            // here we can send OTP to user regarding account confirmation
            // then we require OTP confi    rmation Popup
            // } else {
            //     toast(config.MESSAGES.INVALID_LOGIN_CREDENTIALS, config.TOASTER_OPTIONS.ERROR)
            // }
            handleError(error)
        }
    }
    const login = async () => {
        try {
            setGoogleLoginStart(true)
            await signInWithRedirect({ provider: config.COGNITO_AUTH_PROVIDERS.GOOGLE })
        } catch (error) {
            console.log(error)
            handleError(error)
            setGoogleLoginStart(false)
        }
    }
    return (
        <CustomLayout>
            <section className="v-login-section v-section-padding">
                <div className="container-fluid">
                    <div className="v-form-container">
                        <div className="v-login w-50">
                            <div className="v-tagline">
                                <h1>Login</h1>
                            </div>
                            <div className="v-google-login-btn">
                                <button className="v-plane-btn-hover" onClick={login}>
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
                                            isRequired={true}
                                            {...register("email")}
                                        />
                                    </div>
                                    <div className="v-form-group">
                                        <label htmlFor="password">
                                            Password <span className="text-danger">*</span>
                                        </label>
                                        <div className="v-input-group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="v-input v-password-field"
                                                placeholder="*****"
                                                {...register("password")}
                                            />
                                            <div className="v-input-group-append">
                                                <button
                                                    className="v-btn v-input"
                                                    type="button"
                                                    onClick={togglePasswordField}
                                                >
                                                    <Image
                                                        src={
                                                            showPassword
                                                                ? EyeClose.src
                                                                : EyeOpen.src
                                                        }
                                                        width={20}
                                                        height={20}
                                                        alt="Password toggle"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        {errors.password && errors.password.message ? (
                                            <span className="text-danger">
                                                {errors.password.message}
                                            </span>
                                        ) : (
                                            <></>
                                        )}
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
        </CustomLayout>
    )
}

export default WithoutAuth(Login)
