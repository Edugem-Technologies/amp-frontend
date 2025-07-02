import { MFAModalProps } from "@/types/components/MFAModal"
import React from "react"
import Authenticator from "../common/Authenticator"
import CustomTooltip from "../common/CustomTooltip"
import RadioInput from "../input/RadioInput"
import ModalWrapper from "./ModalWrapper"

/**
 * TwoFactorSettingsModal is a modal component that allows users to configure their Multi-Factor Authentication (MFA) settings.
 *
 * This modal is typically shown after a user has authenticated and chosen to enable or manage 2FA on their account.
 * It currently supports the "Authenticator App" method for receiving OTPs (One-Time Passwords) and provides a UI for users
 * to set up or manage their authenticator app integration.
 *
 * @component
 * @param {MFAModalProps} props - The props for the modal.
 * @param {() => void} props.onClose - Callback to close the modal.
 * @param {() => void} [props.onAdded] - Optional callback invoked after successful 2FA setup.
 * @param {boolean} props.isMFAEnabled - Indicates if MFA is currently enabled for the user.
 *
 * @example
 * <TwoFactorSettingsModal
 *   onClose={() => setShowModal(false)}
 *   isMFAEnabled={user.isMFAEnabled}
 *   onAdded={handle2FAAdded}
 * />
 *
 * @returns {JSX.Element} The rendered modal for 2FA settings.
 */
const TwoFactorSettingsModal: React.FC<MFAModalProps> = ({ onClose, onAdded, isMFAEnabled }) => {
    return (
        <ModalWrapper
            size="xl"
            modalTitle={"MFA Settings"}
            onClose={onClose}
            modalProps={{ className: "two-factor-settings-modal", centered: true }}
        >
            <div className="p-4 min-w-700">
                <div className="d-flex gap-4 mfa-form-container rounded-4 p-4">
                    <div className="min-w-220  mfa-form-container-child">
                        <div className="mb-3 d-flex align-items-center gap-2">
                            <span className="fw-semibold">Start 2FA Via</span>
                            <span data-tooltip-id="2fa-method-tooltip"></span>
                            <CustomTooltip id="2fa-method-tooltip" place="top">
                                Choose how you want to receive your OTP for authentication.
                            </CustomTooltip>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-4">
                            <RadioInput
                                containerClassName="p-0"
                                id="2fa-authenticator"
                                label="Authenticator App"
                                name="2fa-method"
                                checked={true}
                            />
                        </div>
                    </div>

                    <Authenticator
                        onClose={onClose}
                        onAdded={onAdded}
                        isMFAEnabled={isMFAEnabled}
                    />
                </div>
            </div>
        </ModalWrapper>
    )
}

export default TwoFactorSettingsModal
