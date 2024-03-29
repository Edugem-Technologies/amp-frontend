"use client"
import NewPasswordWithOtp from "@/app/components/auth/NewPasswordSetup"
import WithoutAuth from "@/app/components/auth/WithoutAuth"
import CustomLayout from "@/app/components/common/CustomLayout"
import { config } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import {
    ForgotPasswordSchema,
    ForgotPasswordValidationSchema,
} from "@/validations/auth/forgot-password"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPassword } from "aws-amplify/auth"
import { NextPage } from "next"
import { useState } from "react"
import { Spinner } from "react-bootstrap"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const ForgotPassword: NextPage = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<ForgotPasswordSchema>({ resolver: zodResolver(ForgotPasswordValidationSchema) })
    const [loader, setLoader] = useState(false)
    const [showNewPasswordWithOtpForm, setShowNewPasswordWithOtpForm] = useState(false)

    const submitHandler = async (data: ForgotPasswordSchema) => {
        toast.dismiss()
        setLoader(true)
        try {
            await resetPassword({ username: data.email.toLowerCase() })
            setShowNewPasswordWithOtpForm(true)
            toast(config.MESSAGES.OTP_RESENT_SUCCESS, config.TOASTER_OPTIONS.SUCCESS)
        } catch (err) {
            handleError(err)
        } finally {
            setLoader(false)
        }
    }

    return (
        <CustomLayout>
            {showNewPasswordWithOtpForm ? (
                <NewPasswordWithOtp usernameOrEmail={getValues("email")} />
            ) : (
                <section className="v-forgot-password-section v-section-padding">
                    <div className="container">
                        <div className="v-form-container">
                            <div className="v-login p-4">
                                <div className="v-tagline">
                                    <h1>Forgot Password</h1>
                                </div>
                                <div className="v-caption">
                                    <p>
                                        Please enter following details to confirm your
                                        identity,&nbsp;
                                        <span className="v-lg-text-block">
                                            {" "}
                                            once details are validated we will send OTP
                                        </span>
                                    </p>
                                </div>
                                <div className="v-form-content">
                                    <form onSubmit={handleSubmit(submitHandler)}>
                                        <div className="v-form-group mt-0">
                                            <label htmlFor="email">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="E.g. youremail@email.com"
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
                                        <div className="v-form-submit-btn">
                                            <button
                                                className="v-custom-btn v-submit-btn v-fill-btn-hover"
                                                type="submit"
                                            >
                                                {loader ? <Spinner /> : "Send OTP"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </CustomLayout>
    )
}

export default WithoutAuth(ForgotPassword)
