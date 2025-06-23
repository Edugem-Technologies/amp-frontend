"use client"
import AuthHeader from "@/app/components/auth/AuthHeader"
import PrimaryButton from "@/app/components/button/PrimaryButton"
import TextInputField from "@/app/components/input/TextInput"
import { usePermissions } from "@/app/context/PermissionContext"
import { FetchHelper } from "@/services/fetch-helper"

import { CONFIG } from "@/utils/constants"
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
import { SweetAlertIcon } from "sweetalert2"

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
            const payload: Partial<ResetPasswordSchema> = {
                ...data,
            }
            delete payload.password_confirmation
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.RESET_PASSWORD, payload)
            if (response?.status) {
                setLoginDetailsToLocalStorage({
                    permissions: response.data.permissions,
                    roles: response.data.roles,
                    setUserPermissions,
                    userDetails: response.data.user,
                })

                showSweetAlertWithRedirect({
                    text: response?.message,
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                    router,
                    url: "/",
                })
            }
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
