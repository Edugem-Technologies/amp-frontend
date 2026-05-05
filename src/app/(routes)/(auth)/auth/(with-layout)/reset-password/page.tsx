"use client"
import AuthHeader from "@/app/components/auth/AuthHeader"
import PrimaryButton from "@/app/components/button/PrimaryButton"
import TextInputField from "@/app/components/input/TextInput"
import { usePermissions } from "@/app/context/PermissionContext"
import { FetchHelper } from "@/services/FetchHelper"

import { ALERT_ICON_TYPE, CONFIG } from "@/utils/Constants"
import { handleError } from "@/utils/HandleError"
import {
    executeWithRecaptcha,
    setLoginDetailsToLocalStorage,
    showSweetAlertWithRedirect,
} from "@/utils/Helpers"
import {
    ResetPasswordSchema,
    ResetPasswordValidationSchema,
} from "@/validations/auth/ForgotPassword"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

const ResetPassword = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [token] = useState(searchParams.get("token"))
    const [email] = useState(searchParams.get("email"))
    const { setUserPermissions } = usePermissions()

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(ResetPasswordValidationSchema),
        defaultValues: {
            token: token ?? "",
            primary_email: email ?? "",
        },
    })

    const submitHandler = async (data: ResetPasswordSchema) => {
        try {
            // We use grecaptcha to prevent automated abuse and ensure that the reset password request is made by a real user.
            executeWithRecaptcha(async () => {
                const payload: Partial<ResetPasswordSchema> = {
                    ...data,
                }
                delete payload.password_confirmation
                const response = await FetchHelper.post(
                    CONFIG.API_ENDPOINTS.RESET_PASSWORD,
                    payload,
                )
                if (response?.status) {
                    setLoginDetailsToLocalStorage({
                        permissions: response.data.permissions,
                        roles: response.data.roles,
                        setUserPermissions,
                        userDetails: response.data.user,
                    })

                    showSweetAlertWithRedirect({
                        text: response?.message,
                        icon: ALERT_ICON_TYPE.success,
                        router,
                        url: "/",
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
                title={CONFIG.RESET_PASSWORD}
                handleBackClick={() => router.push("/auth/forgot-password")}
            />
            <div className="d-flex flex-column gap-4 mb-4">
                <div className="">
                    <TextInputField
                        disabled
                        label="Email Address"
                        isRequired
                        {...register("primary_email")}
                        errorMsg={errors.primary_email?.message}
                    />
                </div>
                <div className="">
                    <TextInputField
                        type="password"
                        label="Password"
                        isRequired
                        {...register("password")}
                        errorMsg={errors.password?.message}
                    />
                </div>
                <div className="">
                    <TextInputField
                        type="password"
                        label="Confirm Password"
                        isRequired
                        {...register("password_confirmation")}
                        errorMsg={errors.password_confirmation?.message}
                    />
                </div>
            </div>
            <div className="d-grid border-radius-10px">
                <PrimaryButton type="submit" isSubmitting={isSubmitting} buttonTitle="Submit" />
            </div>
        </form>
    )
}

export default ResetPassword
