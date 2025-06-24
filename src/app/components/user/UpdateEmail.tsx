"use client"
import { useAppContext } from "@/app/context/AppContext"
import { FetchHelper } from "@/services/fetch-helper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { showSweetAlert } from "@/utils/helpers"
import {
    SendEmailOTPSchema,
    UpdateEmailSchema,
    UpdateEmailSchemaType,
} from "@/validations/user/UpdateProfile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import SendOTP from "../button/SendOTP"
import FormFooter from "../common/FormFooter"
import TextInputField from "../input/TextInput"

const UpdateEmail: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
    const { user } = useAppContext()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<UpdateEmailSchemaType>({
        resolver: zodResolver(UpdateEmailSchema),
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
                `${CONFIG.API_ENDPOINTS.BASE_OTP_VERIFY}/${CONFIG.OTP_AND_VERIFY_ENDPOINTS.UPDATE_EMAIL}`,
            )
            const response = await FetchHelper.patch(url, payload)
            if (response?.status) {
                showSweetAlert({
                    icon: ALERT_ICON_TYPE.success,
                    text: response.message,
                })
                handleClose()
            }
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <>
            <form className="row form-section" onSubmit={handleSubmit(submitHandler)}>
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
                        endpoint={CONFIG.OTP_AND_VERIFY_ENDPOINTS.UPDATE_EMAIL}
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
