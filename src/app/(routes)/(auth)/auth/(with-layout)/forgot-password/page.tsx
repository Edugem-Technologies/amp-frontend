"use client"
import AuthHeader from "@/app/components/auth/AuthHeader"
import ForgotPasswordForm from "@/app/components/auth/ForgotPassword"
import { FetchHelper } from "@/services/fetch-helper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { executeWithRecaptcha, showSweetAlert } from "@/utils/helpers"
import {
    BaseForgotPasswordSchema,
    BaseForgotPasswordSchemaType,
} from "@/validations/auth/forgotPassword"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

const ForgotPassword = () => {
    const hookForm = useForm<BaseForgotPasswordSchemaType>({
        resolver: zodResolver(BaseForgotPasswordSchema),
    })
    const { handleSubmit } = hookForm
    const router = useRouter()

    const submitHandler = async (data: BaseForgotPasswordSchemaType) => {
        try {
            // We use grecaptcha to prevent automated abuse and ensure that the forgot password request is made by a real user.
            executeWithRecaptcha(async () => {
                const payload = {
                    primary_email: data.primary_email,
                }
                const response = await FetchHelper.post(
                    CONFIG.API_ENDPOINTS.FORGOT_PASSWORD,
                    payload,
                )
                if (response?.status) {
                    showSweetAlert({
                        text: response.message,
                        icon: ALERT_ICON_TYPE.success,
                    })
                }
            })
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <form className="form w-100" onSubmit={handleSubmit(submitHandler)}>
            <AuthHeader
                title={CONFIG.FORGOT_PASSWORD_TITLE}
                handleBackClick={() => router.push("/auth/login")}
            />
            <ForgotPasswordForm hookForm={hookForm} />
        </form>
    )
}

export default ForgotPassword
