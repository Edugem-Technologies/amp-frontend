"use client"
import AuthHeader from "@/app/components/auth/AuthHeader"
import PrimaryButton from "@/app/components/button/PrimaryButton"
import TextInputField from "@/app/components/input/TextInput"
import { FetchHelper } from "@/services/FetchHelper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/Constants"
import { handleError } from "@/utils/HandleError"
import {
    executeWithRecaptcha,
    getDecryptedLocalStorageData,
    getFileUrl,
    setEncryptedSessionStorageData,
    setIsAuthenticated,
    showSweetAlertWithRedirect,
} from "@/utils/Helpers"
import { MFAVerifySchema, MFAVerifySchemaType } from "@/validations/auth/MFASchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectUrl = searchParams.get("redirectUrl") || "/"
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<MFAVerifySchemaType>({
        resolver: zodResolver(MFAVerifySchema),
    })
    const user = getDecryptedLocalStorageData(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DATA)
    const submitHandler = async (data: MFAVerifySchemaType) => {
        try {
            // We use grecaptcha to prevent automated abuse and ensure that the mfa verification is made by a real user.
            /**
             * We use a Promise here to ensure that the async mfa verification logic inside
             * `executeWithRecaptcha` completes before the submitHandler itself resolves.
             *
             * The `executeWithRecaptcha` function expects a callback, but does not return a Promise.
             * By wrapping it in a new Promise and calling `resolve()` after the async logic finishes,
             * we allow the outer async/await flow (such as form submission state) to properly wait
             * for the entire mfa verification and reCAPTCHA process to complete before proceeding.
             */
            await new Promise<void>((resolve) => {
                executeWithRecaptcha(async () => {
                    try {
                        const payload = {
                            ...data,
                            user_uuid: user?.uuid,
                        }
                        const response = await FetchHelper.post(
                            CONFIG.API_ENDPOINTS.VERIFY_MFA,
                            payload,
                        )
                        if (response?.status) {
                            showSweetAlertWithRedirect({
                                text: response.message,
                                icon: ALERT_ICON_TYPE.success,
                                router,
                                url: response?.data?.user?.has_2fa_enabled
                                    ? "/auth/mfa"
                                    : redirectUrl,
                            })
                            setIsAuthenticated()
                            if (user?.document?.length) {
                                const profileImageURL = await getFileUrl(user?.document[0])
                                setEncryptedSessionStorageData(
                                    CONFIG.SESSION_STORAGE_VARIABLES.PROFILE_IMAGE_URL,
                                    profileImageURL,
                                )
                            }
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
        <>
            <AuthHeader
                title={CONFIG.MFA_VERIFY_TITLE}
                handleBackClick={() => router.push("/auth/login")}
            />
            <form className="form w-100" onSubmit={handleSubmit(submitHandler)}>
                <div className="d-flex flex-column gap-4 mb-2">
                    <div className="">
                        <TextInputField
                            label="OTP"
                            isRequired
                            type="text"
                            autoComplete="false"
                            className="custom-input"
                            {...register("otp")}
                            errorMsg={errors?.otp?.message}
                        />
                    </div>
                </div>
                <div className="d-grid border-radius-10px">
                    <PrimaryButton type="submit" isSubmitting={isSubmitting} buttonTitle="Verify" />
                </div>
            </form>
        </>
    )
}

export default Page
