/* eslint-disable @next/next/no-img-element */
"use client"
import WithoutAuth from "@/app/components/auth/WithoutAuth"
import { CONFIG } from "@/utils/constants"
import { SignupSchema, SignupValidationSchema } from "@/validations/auth/signup"
import { zodResolver } from "@hookform/resolvers/zod"
import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import React, { Suspense, useState } from "react"
import { Spinner } from "react-bootstrap"
import { useForm } from "react-hook-form"
import EyeClose from "../../../../../public/images/Eye-close.svg"
import EyeOpen from "../../../../../public/images/Eye-open.svg"
import GoogleLogo from "../../../../../public/images/Google-logo.svg"

import OTPModal from "@/app/components/auth/OTPModal"
import TextInputField from "@/app/components/input/TextInput"
import { FetchHelper } from "@/services/fetch-helper"
import { setAccessToken } from "@/utils/common"
import { handleError } from "@/utils/handle-error"
import { fetchAuthSession, signIn } from "aws-amplify/auth"
import { signIn as NextAuthSignIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const SignUp: NextPage = () => {
    const router = useRouter()
    const togglePasswordField = (
        e: React.MouseEvent<HTMLButtonElement>,
        callback: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        e.preventDefault()
        callback((prev) => !prev)
    }
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
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.CREATE_USER, requestData)
            if (response && response.status) {
                const cognitoUser = await signIn({
                    username: data.email.toLowerCase(),
                    password: data.password,
                })
                if (
                    cognitoUser &&
                    cognitoUser.nextStep.signInStep ===
                        CONFIG.COGNITO_CHALLENGE_NAME.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED
                ) {
                    router.push("/set-new-password")
                } else if (
                    cognitoUser &&
                    cognitoUser.nextStep.signInStep ===
                        CONFIG.COGNITO_CHALLENGE_NAME.CONFIRM_SIGN_UP
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
            if (cognitoException.code === CONFIG.COGNITO_AUTH_EXCEPTIONS.USER_NOT_CONFIRMED) {
                sendOtp()
            } else {
                handleError(error)
            }
        }
    }
    const sendOtp = async () => {
        try {
            toast.dismiss()
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.RESEND_VERIFICATION_CODE, {
                email: getValues("email"),
            })
            if (response && response.status) {
                setShowOtpModal(true)
                toast(CONFIG.MESSAGES.OTP_RESENT_SUCCESS, CONFIG.TOASTER_OPTIONS.SUCCESS)
            } else {
                toast(CONFIG.MESSAGES.OTP_RESENT_FAIL, CONFIG.TOASTER_OPTIONS.ERROR)
            }
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <section className="v-signup-section">
            <div className="container">
                <div className="v-form-container">
                    <div className="v-login">
                        <div className="v-tagline">
                            <div className="v-google-login-btn">
                                <button
                                    className="v-plane-btn-hover"
                                    onClick={async () => {
                                        try {
                                            await NextAuthSignIn("google", {
                                                redirect: true,
                                                callbackUrl: "/",
                                            })
                                        } catch (error) {
                                            handleError(error)
                                        }
                                    }}
                                >
                                    <Image src={GoogleLogo} alt="google-logo" />
                                    <span>Sign up with Google</span>
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
                                            <TextInputField
                                                label="First Name"
                                                errorMsg={errors?.first_name?.message}
                                                required
                                                type="text"
                                                placeholder="E.g. John"
                                                {...register("first_name")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="v-form-group mt-lg-0">
                                            <TextInputField
                                                label="Last Name"
                                                errorMsg={errors?.last_name?.message}
                                                required
                                                type="text"
                                                placeholder="E.g. Doe"
                                                {...register("last_name")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="v-form-group">
                                            <TextInputField
                                                label="Email"
                                                errorMsg={errors?.email?.message}
                                                placeholder="E.g. youremail@email.com"
                                                required
                                                {...register("email")}
                                            />
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
                                                            togglePasswordField(e, setShowPassword)
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
                                                    type={showConfirmPassword ? "text" : "password"}
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
            <Suspense>
                <OTPModal
                    show={showOtpModal}
                    setShow={setShowOtpModal}
                    email={getValues("email")}
                    password={getValues("password")}
                />
            </Suspense>
        </section>
    )
}

export default WithoutAuth(SignUp)
