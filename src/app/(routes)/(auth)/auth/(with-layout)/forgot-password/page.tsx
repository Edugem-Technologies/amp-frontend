"use client"
import AuthHeader from "@/app/components/auth/AuthHeader"
import ForgotPasswordForm from "@/app/components/auth/ForgotPassword"
import { FetchHelper } from "@/services/fetch-helper"
import { Any } from "@/types/common/helper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { showSweetAlert } from "@/utils/helpers"
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            // We use grecaptcha to prevent automated abuse and ensure that the forgot password request is made by a real user.
            grecaptcha.ready(() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                grecaptcha
                    .execute(process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY, {
                        action: "submit",
                    })
                    .then(async () => {
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
                    .catch((error: Any) => {
                        handleError(error)
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
