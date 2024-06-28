/* eslint-disable @next/next/no-img-element */
"use client"
import WithoutAuth from "@/app/components/auth/WithoutAuth"
import { config } from "@/utils/constants"
import { SignupSchema, SignupValidationSchema } from "@/validations/auth/signup"
import { zodResolver } from "@hookform/resolvers/zod"
import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { Spinner } from "react-bootstrap"
import { useForm } from "react-hook-form"
import EyeClose from "../../../../public/images/Eye-close.svg"
import EyeOpen from "../../../../public/images/Eye-open.svg"
import GoogleLogo from "../../../../public/images/Google-logo.svg"
import OTPModal from "../../components/auth/OTPModal"

import CustomLayout from "@/app/components/common/CustomLayout"
import { handleError } from "@/utils/handle-error"
import { fetchAuthSession, signIn, signInWithRedirect } from "aws-amplify/auth"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { setAccessToken } from "@/utils/common"
import { FetchHelper } from "@/services/fetch-helper"

const SignUp: NextPage = () => {
    const router = useRouter()
    const togglePasswordField = (
        e: React.MouseEvent<HTMLButtonElement>,
        callback: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        e.preventDefault()
        callback((prev) => !prev)
    }
    const [googleLoginStart, setGoogleLoginStart] = useState(false)
    const [showOtpModal, setShowOtpModal] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
    } = useForm<SignupSchema>({ resolver: zodResolver(SignupValidationSchema) })
    const submitHandler = async (data: SignupSchema) => {
        try {
            const requestData = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email.toLowerCase(),
                password: data.password,
            }
            const response = await FetchHelper.post(config.API_ENDPOINTS.CREATE_USER, requestData)
            if (response && response.status) {
                const cognitoUser = await signIn({
                    username: data.email.toLowerCase(),
                    password: data.password,
                })
                if (
                    cognitoUser &&
                    cognitoUser.nextStep.signInStep ===
                        config.COGNITO_CHALLENGE_NAME.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED
                ) {
                    router.push("/set-new-password")
                } else if (
                    cognitoUser &&
                    cognitoUser.nextStep.signInStep ===
                        config.COGNITO_CHALLENGE_NAME.CONFIRM_SIGN_UP
                ) {
                    setShowOtpModal(true)
                } else if (cognitoUser.isSignedIn) {
                    const session = await fetchAuthSession()
                    const accessToken = session?.tokens?.accessToken?.toString()
                    if (accessToken) {
                        setAccessToken(accessToken)
                        router.push("/profile")
                    }
                    router.push("/login")
                }
            } else {
                handleError(response)
            }
        } catch (error) {
            const cognitoException = JSON.parse(JSON.stringify(error))
            if (cognitoException.code === config.COGNITO_AUTH_EXCEPTIONS.USER_NOT_CONFIRMED) {
                sendOtp()
            } else {
                handleError(error)
            }
        }
    }
    const login = async () => {
        try {
            setGoogleLoginStart(true)
            await signInWithRedirect({ provider: config.COGNITO_AUTH_PROVIDERS.GOOGLE })
        } catch (error) {
            handleError(error)
            setGoogleLoginStart(false)
        }
    }
    const sendOtp = async () => {
        try {
            toast.dismiss()
            const response = await FetchHelper.post(config.API_ENDPOINTS.RESEND_VERIFICATION_CODE, {
                email: getValues("email"),
            })
            if (response && response.status) {
                setShowOtpModal(true)
                toast(config.MESSAGES.OTP_RESENT_SUCCESS, config.TOASTER_OPTIONS.SUCCESS)
            } else {
                toast(config.MESSAGES.OTP_RESENT_FAIL, config.TOASTER_OPTIONS.ERROR)
            }
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <CustomLayout>
            <section className="v-signup-section v-section-padding">
                <div className="container">
                    <div className="v-form-container">
                        <div className="v-login">
                            <div className="v-tagline">
                                <div className="v-google-login-btn">
                                    <button className="v-plane-btn-hover" onClick={login}>
                                        <Image src={GoogleLogo} alt="google-logo" />
                                        <span>Sign up with Google</span>
                                        {googleLoginStart ? <Spinner variant="dark" /> : ""}
                                    </button>
                                </div>
                            </div>
                            <div className="v-hr-row">
                                <hr />
                                <span>Or Sign up with</span>
                                <hr />
                            </div>
                            <div className="v-form-content">
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="v-form-group mt-0">
                                                <label htmlFor="first_name">
                                                    First Name{" "}
                                                    <span className="text-danger">*</span>{" "}
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="E.g. John"
                                                    {...register("first_name")}
                                                />
                                                {errors.first_name && errors.first_name.message ? (
                                                    <span className="text-danger">
                                                        {errors.first_name.message}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="v-form-group mt-lg-0">
                                                <label htmlFor="last_name">
                                                    Last Name <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="E.g. Doe"
                                                    {...register("last_name")}
                                                />
                                                {errors.last_name && errors.last_name.message ? (
                                                    <span className="text-danger">
                                                        {errors.last_name.message}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="v-form-group">
                                                <label htmlFor="email">
                                                    Email <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="E.g. johndoe@example.com"
                                                    {...register("email")}
                                                />
                                                {errors.email && errors.email.message ? (
                                                    <span className="text-danger">
                                                        {errors.email.message}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="v-form-group">
                                                <label htmlFor="password">
                                                    Enter Password{" "}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <div className="v-input-group">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        className="v-input v-password-field"
                                                        placeholder="******"
                                                        {...register("password")}
                                                        autoComplete="new-password"
                                                    />
                                                    <div className="v-input-group-append">
                                                        <button
                                                            className="v-btn v-input"
                                                            tabIndex={-1}
                                                            type="button"
                                                            onClick={(e) =>
                                                                togglePasswordField(
                                                                    e,
                                                                    setShowPassword,
                                                                )
                                                            }
                                                        >
                                                            <img
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

                                                <div className="v-helper-text">
                                                    <span>
                                                        <small>Your password must contain:</small>
                                                    </span>
                                                    <ul>
                                                        <li>
                                                            <small>
                                                                at least 6 characters long including
                                                                numbers and letters
                                                            </small>
                                                        </li>
                                                        {/* <li><small>Include at least one uppercase letter</small></li>
                                                        <li><small>Include at least one number</small></li>
                                                        <li><small>Include at least one symbol</small></li> */}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="v-form-group">
                                                <label htmlFor="password">
                                                    Confirm Password{" "}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <div className="v-input-group">
                                                    <input
                                                        type={
                                                            showConfirmPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        className="v-input v-password-field"
                                                        placeholder="******"
                                                        {...register("confirm_password")}
                                                    />
                                                    <div className="v-input-group-append">
                                                        <button
                                                            className="v-btn v-input"
                                                            tabIndex={-1}
                                                            type="button"
                                                            onClick={(e) =>
                                                                togglePasswordField(
                                                                    e,
                                                                    setShowConfirmPassword,
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={
                                                                    showConfirmPassword
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
                                                {errors.confirm_password &&
                                                errors.confirm_password.message ? (
                                                    <span className="text-danger">
                                                        {errors.confirm_password.message}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="v-form-group v-submit-btn">
                                        <button
                                            type="submit"
                                            className={`v-submit-btn ${
                                                isSubmitting ? "" : " v-fill-btn-hover"
                                            }`}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? <Spinner variant="light" /> : "Submit"}
                                        </button>
                                    </div>
                                    <div className="v-signup">
                                        <p>
                                            Already have an account?&nbsp;
                                            <Link href={"/login"}>Login</Link>
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

export default WithoutAuth(SignUp)
