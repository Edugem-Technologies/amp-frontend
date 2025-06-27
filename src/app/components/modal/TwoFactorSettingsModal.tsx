import React, { useEffect, useRef, useState } from "react"
import PrimaryButton from "../button/PrimaryButton"
import SecondaryButton from "../button/SecondaryButton"
import CustomTooltip from "../common/CustomTooltip"
import RadioInput from "../input/RadioInput"
import TextInputField from "../input/TextInput"
import ToggleSwitchInput from "../input/ToggleSwitchInput"
import ModalWrapper from "./ModalWrapper"
import AuthModal from "./AuthModal"
import Authenticator from "../common/Authenticator"
import { DefaultModalPropType } from "@/types/components/Modal"

// Info icon with class for styling (add .info-icon class in your CSS/SCSS)
const InfoIcon = () => (
    <span className="info-icon ms-1 cursor-pointer" tabIndex={0}>
        {/* Replace with <Icon iconName="info" /> if you add info.svg */}
        <span className="d-inline-block rounded-circle bg-light text-primary fw-bold small text-center lh-1 info-icon-inner">
            i
        </span>
    </span>
)

const TwoFactorSettingsModal: React.FC<DefaultModalPropType & { isMFAEnabled: boolean }> = ({
    onClose,
    onAdded,
    isMFAEnabled,
}) => {
    const [isAuthenticationModalOpen, setIsAuthenticationModalOpen] = useState(true)
    return (
        <ModalWrapper
            size="xl"
            modalTitle={"MFA Settings"}
            onClose={onClose}
            modalProps={{ className: "two-factor-settings-modal", centered: true }}
        >
            <div className="p-4 min-w-700">
                {/* 2FA Status Toggle */}
                <div className="d-flex align-items-center mb-4 gap-4">
                    <span className="fw-semibold">Updated MFA Status</span>
                    <div className="ms-4">
                        <ToggleSwitchInput
                            checked={!isMFAEnabled}
                            inputClassName=""
                            label=""
                            disabled
                        />
                    </div>
                </div>

                {/* 2FA Method and OTP Section */}
                {!isAuthenticationModalOpen && (
                    <div className="d-flex gap-4 mfa-form-container rounded-4 p-4">
                        {/* Method Selection */}
                        <div className="min-w-220  mfa-form-container-child">
                            <div className="mb-3 d-flex align-items-center gap-2">
                                <span className="fw-semibold">Start 2FA Via</span>
                                <span data-tooltip-id="2fa-method-tooltip"></span>
                                <CustomTooltip id="2fa-method-tooltip" place="top">
                                    Choose how you want to receive your OTP for authentication.
                                </CustomTooltip>
                            </div>
                            <div className="d-flex flex-column gap-2 mb-4">
                                {/* TODO: will add email option later */}
                                {/* <RadioInput
                                id="2fa-email"
                                label="Email"
                                checked={method === "email"}
                                onChange={() => setMethod("email")}
                                name="2fa-method"
                            /> */}
                                <RadioInput
                                    containerClassName="p-0"
                                    id="2fa-authenticator"
                                    label="Authenticator App"
                                    name="2fa-method"
                                    checked={true}
                                />
                            </div>
                            {/* <PrimaryButton
                                buttonTitle="Start Authentication"
                                onClick={() => setIsAuthenticationModalOpen(true)}
                                customClassName="w-100"
                            /> */}
                        </div>

                        {/* OTP Input Section */}
                        {/* <div className="flex-grow-1">
                            <TextInputField
                                label="OTP"
                                isRequired
                                placeholder="Enter OTP"
                                inputFieldClassName=""
                            />
                            <div className="d-flex align-items-center mt-2 gap-3">
                                // TODO: will add resend OTP later with Email functionality
                                <span className="text-muted fs-6">
                                {otpSent && resendTimer > 0 ? (
                                    <>Resend OTP in {resendTimer}s</>
                                ) : (
                                    <>
                                        {otpSent && (
                                            <span
                                                className="text-primary cursor-pointer text-decoration-underline"
                                                onClick={handleResendOTP}
                                            >
                                                Resend OTP
                                            </span>
                                        )}
                                    </>
                                )}
                            </span>
                                <PrimaryButton buttonTitle="Verify OTP" />
                            </div>
                        </div> */}
                        <Authenticator
                            onClose={onClose}
                            onAdded={onAdded}
                            isMFAEnabled={isMFAEnabled}
                        />
                    </div>
                )}

                {/* Footer */}
                {/* <div className="d-flex justify-content-end mt-4">
                    <SecondaryButton buttonTitle="Cancel" onClick={onClose} />
                </div> */}
            </div>
            {isAuthenticationModalOpen && (
                <AuthModal
                    onClose={
                        isMFAEnabled
                            ? () => {
                                  setIsAuthenticationModalOpen(false)
                                  onClose()
                              }
                            : () => setIsAuthenticationModalOpen(false)
                    }
                    isMFAEnabled={isMFAEnabled}
                    onAdded={() => {
                        isMFAEnabled ? () => onAdded && onAdded() : undefined
                    }}
                />
            )}
        </ModalWrapper>
    )
}

export default TwoFactorSettingsModal
