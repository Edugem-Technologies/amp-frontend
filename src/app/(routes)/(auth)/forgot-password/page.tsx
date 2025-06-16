"use client"
import AuthHeader from "@/app/components/auth/AuthHeader"
import ForgotPasswordForm from "@/app/components/auth/ForgotPassword"
import { FetchHelper } from "@/services/fetch-helper"
import { CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { showSweetAlert } from "@/utils/helpers"
import {
    BaseForgotPasswordSchema,
    BaseForgotPasswordSchemaType,
} from "@/validations/auth/forgotPassword"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { SweetAlertIcon } from "sweetalert2"

const ForgotPassword = () => {
    const hookForm = useForm<BaseForgotPasswordSchemaType>({
        resolver: zodResolver(BaseForgotPasswordSchema),
    })
    const { handleSubmit } = hookForm
    const router = useRouter()

    const submitHandler = async (data: BaseForgotPasswordSchemaType) => {
        try {
            const payload = {
                primary_email: data.primary_email,
            }
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.FORGOT_PASSWORD, payload)
            if (response?.status) {
                showSweetAlert({
                    text: response.message,
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                })
            }
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <form className="form w-100" onSubmit={handleSubmit(submitHandler)}>
            <AuthHeader
                title={CONFIG.FORGOT_PASSWORD_TITLE}
                handleBackClick={() => router.push("/auth/signin")}
            />
            <ForgotPasswordForm hookForm={hookForm} />
        </form>
    )
}

export default ForgotPassword
