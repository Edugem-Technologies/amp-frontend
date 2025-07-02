import PrimaryButton from "@/app/components/button/PrimaryButton"
import TextInputField from "@/app/components/input/TextInput"
import ModalWrapper from "@/app/components/modal/ModalWrapper"
import { MFAEnum } from "@/enums/MFAEnum"
import { FetchHelper } from "@/services/fetch-helper"
import { MFAModalProps } from "@/types/components/MFAModal"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { showSweetAlert } from "@/utils/helpers"
import { EmailPasswordLoginSchema, EmailPasswordLoginSchemaType } from "@/validations/auth/Login"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"

/**
 * AuthModal is a modal dialog component that prompts the user to authenticate
 * with their email and password before enabling or disabling Multi-Factor Authentication (MFA).
 *
 * This modal is typically used as a security step before allowing sensitive actions
 * such as toggling MFA settings. If MFA is currently enabled, it will also update
 * the MFA status after successful authentication.
 *
 * @component
 * @param {MFAModalProps} props - The props for AuthModal.
 * @param {() => void} props.onClose - Callback to close the modal.
 * @param {boolean} props.isMFAEnabled - Indicates if MFA is currently enabled for the user.
 * @param {() => void} [props.onAdded] - Optional callback invoked after successful authentication and MFA status update.
 *
 * @example
 * <AuthModal
 *   onClose={handleClose}
 *   isMFAEnabled={user.isMFAEnabled}
 *   onAdded={handleMFASuccess}
 * />
 */
const AuthModal: React.FC<MFAModalProps> = ({ onClose, isMFAEnabled, onAdded }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EmailPasswordLoginSchemaType>({
        resolver: zodResolver(EmailPasswordLoginSchema),
    })

    /**
     * Handles form submission for authentication.
     * If authentication is successful and MFA is enabled, updates the MFA status.
     *
     * @param {EmailPasswordLoginSchemaType} data - The form data containing email and password.
     */
    const submitHandler = async (data: EmailPasswordLoginSchemaType) => {
        try {
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.LOGIN, data)
            if (response?.status) {
                if (isMFAEnabled) {
                    // Wait for 200ms before retrying the request (to allow new cookies to be set in browser)
                    await new Promise((resolve) => setTimeout(resolve, 200))
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
                            text: MFAStatusResponse?.message,
                        })
                    }
                }
                onAdded && onAdded()
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
                    <PrimaryButton
                        type="submit"
                        buttonTitle="Authenticate"
                        isSubmitting={isSubmitting}
                    />
                </div>
            </form>
        </ModalWrapper>
    )
}

export default AuthModal
