"use client"

import AuthHeader from "@/app/components/auth/AuthHeader"
import SocialLogin from "@/app/components/auth/SocialLogin"
import LoginForm from "@/app/components/auth/LoginForm"
import { usePermissions } from "@/app/context/PermissionContext"
import { FetchHelper } from "@/services/fetch-helper"
import { Role } from "@/types/data/loginData"
import { CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import {
    getUniqueValueFromArray,
    setEncryptedLocalStorageData,
    showSweetAlertWithRedirect,
} from "@/utils/helpers"
import { LoginValidationSchema, LoginValidationSchemaType } from "@/validations/auth/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { SweetAlertIcon } from "sweetalert2"

const Login = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    // Todo: will update once dashboard is created
    const redirectUrl = searchParams.get(CONFIG.PARAMS.REDIRECT_URL_PARAM) || "/"

    const hookForm = useForm<LoginValidationSchemaType>({
        resolver: zodResolver(LoginValidationSchema),
    })
    const { handleSubmit } = hookForm
    const { setUserPermissions } = usePermissions()

    const submitHandler = async (data: LoginValidationSchemaType) => {
        try {
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.LOGIN, data)
            if (response?.status) {
                setEncryptedLocalStorageData(
                    CONFIG.LOCAL_STORAGE_VARIABLES.PERMISSIONS,
                    response.data.permissions,
                )
                const roleData = getUniqueValueFromArray(
                    response.data.roles.map((role: Role) => role.name),
                ).join(", ")
                const userData = { ...response.data.details, role: roleData }
                setEncryptedLocalStorageData(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DATA, userData)
                setUserPermissions(response.data.permissions)
                showSweetAlertWithRedirect({
                    text: response.message,
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                    router,
                    url: redirectUrl,
                })
            }
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <form className="form w-100" onSubmit={handleSubmit(submitHandler)}>
            <AuthHeader title={CONFIG.LOG_IN_TITLE} />
            <LoginForm hookForm={hookForm} />
            <SocialLogin />
        </form>
    )
}

export default Login
