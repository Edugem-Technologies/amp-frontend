"use client"
import AuthHeader from "@/app/components/auth/AuthHeader"
import PrimaryButton from "@/app/components/button/PrimaryButton"
import TextInputField from "@/app/components/input/TextInput"
import { usePermissions } from "@/app/context/PermissionContext"
import { FetchHelper } from "@/services/fetch-helper"
import { Any } from "@/types/common/helper"

import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { setLoginDetailsToLocalStorage, showSweetAlertWithRedirect } from "@/utils/helpers"
import {
    ResetPasswordSchema,
    ResetPasswordValidationSchema,
} from "@/validations/auth/forgotPassword"

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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            // We use grecaptcha to prevent automated abuse and ensure that the reset password request is made by a real user.
            grecaptcha.ready(() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                grecaptcha
                    .execute(process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY, {
                        action: "submit",
                    })
                    .then(async () => {
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
