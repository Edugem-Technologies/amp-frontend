"use client"
import AuthHeader from "@/app/components/auth/AuthHeader"
import ForgotPasswordForm from "@/app/components/auth/ForgotPassword"
import { FetchHelper } from "@/services/FetchHelper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/Constants"
import { handleError } from "@/utils/HandleError"
import { executeWithRecaptcha, showSweetAlert } from "@/utils/Helpers"
import {
    BaseForgotPasswordSchema,
    BaseForgotPasswordSchemaType,
} from "@/validations/auth/ForgotPassword"

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
            /**
             * We use a Promise here to ensure that the async forgot password logic inside
             * `executeWithRecaptcha` completes before the submitHandler itself resolves.
             *
             * The `executeWithRecaptcha` function expects a callback, but does not return a Promise.
             * By wrapping it in a new Promise and calling `resolve()` after the async logic finishes,
             * we allow the outer async/await flow (such as form submission state) to properly wait
             * for the entire forgot password and reCAPTCHA process to complete before proceeding.
             */
            await new Promise<void>((resolve) => {
                executeWithRecaptcha(async () => {
                    try {
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
                        resolve()
                    } catch (error) {
                        handleError(error)
                    }
                })
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
