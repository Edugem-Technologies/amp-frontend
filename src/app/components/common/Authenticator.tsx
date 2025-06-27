"use client"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import ShowFormError from "../common/ShowFormError"
import { FetchHelper } from "@/services/fetch-helper"
import { handleError } from "@/utils/handle-error"
import CustomSkeleton from "../common/CustomSkeleton"
import toast from "react-hot-toast"
import { MFAEnum } from "@/enums/MFAEnum"
import TextInputField from "../input/TextInput"
import { MFAuthenticatorSchema, MFAuthenticatorSchemaType } from "@/validations/auth/MFASchema"
import { useAppContext } from "@/app/context/AppContext"
import PrimaryButton from "../button/PrimaryButton"
import { showSweetAlert } from "@/utils/helpers"
import { DefaultModalPropType } from "@/types/components/Modal"

const Authenticator: React.FC<DefaultModalPropType & { isMFAEnabled: boolean }> = ({
    onClose,
    onAdded,
    isMFAEnabled,
}) => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("")

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<MFAuthenticatorSchemaType>({
        resolver: zodResolver(MFAuthenticatorSchema),
    })
    const { user } = useAppContext()

    const submitHandler = async (data: MFAuthenticatorSchemaType) => {
        try {
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.VERIFY_MFA, {
                otp: data.authenticator_otp,
                user_uuid: user?.uuid,
            })
            if (response?.status) {
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
                    onClose()
                    onAdded && onAdded()
                }
            }
        } catch (error) {
            handleError(error)
        }
    }

    const fetchQrCode = async () => {
        try {
            const response = await FetchHelper.getBlobResponse(CONFIG.API_ENDPOINTS.GET_QR_CODE)
            const QRUrl = URL.createObjectURL(response)
            setQrCodeUrl(QRUrl)
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
        fetchQrCode()
    }, [])

    return (
        <form
            className="form w-100 mfa-form-container-child"
            onSubmit={handleSubmit(submitHandler)}
        >
            <div className="row">
                <div className="col-md-4">
                    {qrCodeUrl ? (
                        <img className="qr-code-image w-100" src={qrCodeUrl} alt="MFA QR Code" />
                    ) : (
                        <CustomSkeleton rowCount={1} stopHorizontalScrolling={true} stopVh={true} />
                    )}
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-between align-items-end">
                    <div className="w-100 mb-3">
                        <TextInputField
                            label="OTP Verification"
                            isRequired
                            {...register("authenticator_otp")}
                            type="text"
                            className="form-control"
                            placeholder="Enter OTP"
                            id="otp"
                            errorMsg={errors.authenticator_otp?.message}
                        />
                    </div>
                    <PrimaryButton
                        buttonTitle="Verify OTP"
                        type="submit"
                        isSubmitting={isSubmitting}
                        customClassName="w-100"
                    />
                </div>
            </div>
        </form>
    )
}

export default Authenticator
