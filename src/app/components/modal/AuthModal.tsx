import PrimaryButton from "@/app/components/button/PrimaryButton"
import TextInputField from "@/app/components/input/TextInput"
import ModalWrapper from "@/app/components/modal/ModalWrapper"
import { usePermissions } from "@/app/context/PermissionContext"
import { FetchHelper } from "@/services/fetch-helper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { setLoginDetailsToLocalStorage, showSweetAlert } from "@/utils/helpers"
import { EmailPasswordLoginSchema, EmailPasswordLoginSchemaType } from "@/validations/auth/Login"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import TwoFactorSettingsModal from "./TwoFactorSettingsModal"
import { DefaultModalPropType } from "@/types/components/Modal"
import { MFAEnum } from "@/enums/MFAEnum"

interface AuthModalProps {
    onClose: () => void
}

const AuthModal: React.FC<DefaultModalPropType & { isMFAEnabled: boolean }> = ({
    onClose,
    isMFAEnabled,
    onAdded,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailPasswordLoginSchemaType>({
        resolver: zodResolver(EmailPasswordLoginSchema),
    })
    const { setUserPermissions } = usePermissions()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const submitHandler = async (data: EmailPasswordLoginSchemaType) => {
        try {
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.LOGIN, data)
            if (response?.status) {
                // setLoginDetailsToLocalStorage({
                //     permissions: response.data.permissions,
                //     roles: response.data.roles,
                //     setUserPermissions,
                //     userDetails: response.data.user,
                //     updateAuthenticatedStatus: false,
                // })
                if (isMFAEnabled) {
                    await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait for 200ms before retrying the request (to allow new cookies to be set in browser)
                    const MFAStatusResponse = await FetchHelper.post(
                        CONFIG.API_ENDPOINTS.UPDATE_MFA_STATUS,
                        {
                            has_2fa_enabled: !isMFAEnabled,
                            selected_2fa_type: MFAEnum.AUTHENTICATOR_APP,
                        },
                    )
                    if (MFAStatusResponse?.status) {
                        showSweetAlert({
                            icon: ALERT_ICON_TYPE.success,
                            text: response?.message,
                        })
                        onAdded && onAdded()
                        onClose()
                    }
                } else {
                    onAdded && onAdded()
                    onClose()
                }
            }
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <ModalWrapper modalTitle="Authenticate" onClose={onClose} modalProps={{ centered: true }}>
            <form className="p-4" onSubmit={handleSubmit(submitHandler)} autoComplete="off">
                <div className="mb-3">
                    <TextInputField
                        label="Email"
                        isRequired
                        inputFieldClassName=""
                        inputContainerClass=""
                        {...register("primary_email")}
                        errorMsg={errors.primary_email?.message}
                    />
                </div>
                <div className="mb-3">
                    <TextInputField
                        autoComplete="off"
                        label="Password"
                        type="password"
                        isRequired
                        inputFieldClassName=""
                        inputContainerClass=""
                        {...register("password")}
                        errorMsg={errors.password?.message}
                    />
                </div>
                <div className="d-grid">
                    <PrimaryButton type="submit" buttonTitle="Authenticate" />
                </div>
            </form>
        </ModalWrapper>
    )
}

export default AuthModal
