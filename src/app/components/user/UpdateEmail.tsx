"use client"
import { FetchHelper } from "@/services/FetchHelper"
import { BaseUpdateUserProps } from "@/types/components/UpdateUser"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/Constants"
import { handleError } from "@/utils/HandleError"
import { showSweetAlert } from "@/utils/Helpers"
import {
    SendEmailOTPSchema,
    UpdateEmailSchemaType,
    VerifyOTPSchema,
} from "@/validations/user/UpdateProfile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import SendOTP from "../button/SendOTP"
import FormFooter from "../common/FormFooter"
import TextInputField from "../input/TextInput"

const UpdateEmail: React.FC<BaseUpdateUserProps> = ({ handleClose, user, setRefetch }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<UpdateEmailSchemaType>({
        resolver: zodResolver(VerifyOTPSchema),
        defaultValues: {
            primary_email: user?.primary_email,
            otp: "",
        },
    })

    const submitHandler = async (data: UpdateEmailSchemaType) => {
        try {
            const payload: Partial<UpdateEmailSchemaType> = data
            delete payload.primary_email
            const url = new URL(
                `${CONFIG.API_ENDPOINTS.BASE_OTP_VERIFY}/${CONFIG.OTP_AND_VERIFY_ENDPOINTS.EMAIL_UPDATE}`,
            )
            const response = await FetchHelper.patch(url, payload)
            if (response?.status) {
                showSweetAlert({
                    icon: ALERT_ICON_TYPE.success,
                    text: response.message,
                })
                setRefetch((prev) => !prev)
                handleClose()
            }
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <>
            <form className="row form-section mb-0" onSubmit={handleSubmit(submitHandler)}>
                <div className="col-md-3">
                    <TextInputField
                        label="Enter New Email Address"
                        isRequired
                        type="text"
                        autoComplete="false"
                        className="custom-input"
                        {...register("primary_email")}
                        errorMsg={errors?.primary_email?.message}
                    />
                    <SendOTP
                        endpoint={CONFIG.OTP_AND_VERIFY_ENDPOINTS.EMAIL_UPDATE}
                        customClassName="mt-2"
                        payload={watch()}
                        schema={SendEmailOTPSchema}
                    />
                </div>

                <div className="col-md-3">
                    <TextInputField
                        label="OTP"
                        isRequired
                        type="text"
                        autoComplete="off"
                        errorMsg={errors?.otp?.message}
                        className="custom-input"
                        {...register("otp")}
                    />
                </div>

                <FormFooter
                    saveButtonTitle="Update Email"
                    isSubmitting={isSubmitting}
                    handleCancelButton={handleClose}
                />
            </form>
        </>
    )
}

export default UpdateEmail
