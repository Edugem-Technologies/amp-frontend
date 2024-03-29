import { NewPasswordSetupPropType } from "@/types/components/new-password-setup"
import { config } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import {
    UpdateNewPasswordSchema,
    UpdateNewPasswordValidationSchema,
} from "@/validations/auth/forgot-password"
import { zodResolver } from "@hookform/resolvers/zod"
import { confirmResetPassword } from "aws-amplify/auth"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Spinner } from "react-bootstrap"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import EyeClose from "../../../../public/images/Eye-close.svg"
import EyeOpen from "../../../../public/images/Eye-open.svg"

const NewPasswordSetup: React.FC<NewPasswordSetupPropType> = ({ usernameOrEmail }) => {
    const router = useRouter()
    const togglePasswordField = (
        e: React.MouseEvent<HTMLButtonElement>,
        callback: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        e.preventDefault()
        callback((prev) => !prev)
    }
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateNewPasswordSchema>({
        resolver: zodResolver(UpdateNewPasswordValidationSchema),
    })

    const submitHandler = async (data: UpdateNewPasswordSchema) => {
        setLoading(true)
        try {
            await confirmResetPassword({
                username: usernameOrEmail.toLowerCase(),
                confirmationCode: data.otp,
                newPassword: data.password,
            })
            toast(config.MESSAGES.PASSWORD_RESET_SUCCESS, config.TOASTER_OPTIONS.SUCCESS)
            router.replace("/login")
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <section className="v-change-password-section v-section-padding">
                <div className="container">
                    <div className="v-form-container">
                        <div className="v-login">
                            <div className="v-tagline">
                                <h1>Change Password</h1>
                            </div>
                            <div className="v-form-content">
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="v-form-group">
                                                <label htmlFor="otp">
                                                    Enter OTP <span className="text-danger">*</span>
                                                </label>
                                                <div className="v-input-group">
                                                    <input
                                                        type="text"
                                                        className="v-input"
                                                        placeholder="E.g 674312"
                                                        {...register("otp")}
                                                    />
                                                </div>
                                                {errors.otp && errors.otp.message ? (
                                                    <span className="text-danger">
                                                        {errors.otp.message}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <div className="v-form-group">
                                                <label htmlFor="password">
                                                    Enter New Password{" "}
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
                                                            tabIndex={-1}
                                                            className="v-btn v-input"
                                                            type="button"
                                                            onClick={(e) =>
                                                                togglePasswordField(
                                                                    e,
                                                                    setShowPassword,
                                                                )
                                                            }
                                                        >
                                                            <Image
                                                                src={
                                                                    showPassword
                                                                        ? EyeClose
                                                                        : EyeOpen
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
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
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
                                                        {...register("confirmPassword")}
                                                    />
                                                    <div className="v-input-group-append">
                                                        <button
                                                            className="v-btn v-input"
                                                            type="button"
                                                            onClick={(e) =>
                                                                togglePasswordField(
                                                                    e,
                                                                    setShowConfirmPassword,
                                                                )
                                                            }
                                                        >
                                                            <Image
                                                                src={
                                                                    showConfirmPassword
                                                                        ? EyeClose
                                                                        : EyeOpen
                                                                }
                                                                width={20}
                                                                height={20}
                                                                alt="Password toggle"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                                {errors.confirmPassword &&
                                                errors.confirmPassword.message ? (
                                                    <span className="text-danger">
                                                        {errors.confirmPassword.message}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="v-form-btn-group">
                                        <button
                                            className="v-submit-btn v-custom-btn v-fill-btn-hover btn btn-lg"
                                            type="submit"
                                        >
                                            {loading ? <Spinner /> : "Submit"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NewPasswordSetup
