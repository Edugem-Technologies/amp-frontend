import { FetchHelper } from "@/services/fetch-helper"
import { OtpModalPropType } from "@/types/components/otp-modal"
import { setAccessToken } from "@/utils/common"
import { CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { OtpSchema, OtpValidationSchema } from "@/validations/auth/otp"
import { zodResolver } from "@hookform/resolvers/zod"
import { fetchAuthSession, signIn } from "aws-amplify/auth"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"
import { Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import CustomButton from "../common/Button"
import TextInputField from "../common/TextInput"

const OTPModal: React.FC<OtpModalPropType> = ({ show, setShow, email, password }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectUrl = searchParams.get(CONFIG.PARAMS.REDIRECT_URL_PARAM) || "/profile"
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<OtpSchema>({ resolver: zodResolver(OtpValidationSchema) })

    const handleClose = () => setShow(false)
    const submitHandler = async (data: OtpSchema) => {
        const requestData = {
            email,
            verification_code: data.otp,
        }
        try {
            const response = await FetchHelper.post(
                CONFIG.API_ENDPOINTS.CONFIRM_VERIFICATION_CODE,
                requestData,
            )
            if (response && response.status && response.data) {
                toast(CONFIG.MESSAGES.USER_EMAIL_VERIFIED, CONFIG.TOASTER_OPTIONS.SUCCESS)
                await signIn({ username: email, password })
                const session = await fetchAuthSession()
                const accessToken = session?.tokens?.accessToken?.toString()
                // if jwt received then check whether user exist in db or not
                if (accessToken) {
                    const response = await FetchHelper.get(CONFIG.API_ENDPOINTS.GET_USER_BY_TOKEN)
                    // if user exists then set the cookie and redirect
                    if (response && response.data && response.status) {
                        toast(CONFIG.MESSAGES.USER_LOGIN_SUCCESS, CONFIG.TOASTER_OPTIONS.SUCCESS)
                        setAccessToken(accessToken)
                        handleClose()
                        router.push(redirectUrl)
                    }
                    // else show error
                    else {
                        handleError(response)
                    }
                } else {
                    toast(CONFIG.MESSAGES.GENERIC_ERROR, CONFIG.TOASTER_OPTIONS.ERROR)
                }
            }
        } catch (error) {
            handleError(error)
        }
    }

    const resendOtp = async () => {
        try {
            toast.dismiss()
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.RESEND_VERIFICATION_CODE, {
                email,
            })
            if (response && response.status) {
                toast(CONFIG.MESSAGES.OTP_RESENT_SUCCESS, CONFIG.TOASTER_OPTIONS.SUCCESS)
            } else {
                toast(CONFIG.MESSAGES.OTP_RESENT_FAIL, CONFIG.TOASTER_OPTIONS.ERROR)
            }
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            onHide={handleClose}
            centered
            className="v-otp-modal"
        >
            <Modal.Body>
                <div className="v-forgot-password-section">
                    <div className="container">
                        <div className="v-form-container p-3">
                            <div className="v-login p-0">
                                <div className="v-tagline">
                                    <h1>Enter OTP</h1>
                                </div>
                                <div className="v-caption">
                                    <p>We have sent OTP to your email address</p>
                                </div>
                                <div className="v-form-content">
                                    <form onSubmit={handleSubmit(submitHandler)}>
                                        <div className="v-form-group mt-0">
                                            <TextInputField
                                                label="Enter OTP"
                                                errorMsg={errors?.otp?.message}
                                                placeholder="E.g. 345862"
                                                required
                                                {...register("otp")}
                                            />
                                        </div>
                                        <div className="v-form-submit-btn">
                                            <CustomButton
                                                className="v-submit-btn v-fill-btn-hover"
                                                type="submit"
                                                isSubmitting={isSubmitting}
                                                title={"Submit"}
                                            />
                                        </div>
                                        <div className="v-resend-otp">
                                            <button type="button" onClick={resendOtp}>
                                                Didn&apos;t receive a code ? Resend
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default OTPModal
