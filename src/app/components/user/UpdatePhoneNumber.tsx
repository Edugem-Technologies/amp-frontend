"use client"
import { FetchHelper } from "@/services/FetchHelper"
import { BaseUpdateUserProps } from "@/types/components/UpdateUser"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/Constants"
import { handleError } from "@/utils/HandleError"
import { showSweetAlert } from "@/utils/Helpers"
import {
    SendPhoneNumberOTPSchema,
    UpdatePhoneNumberSchemaType,
    VerifyOTPSchema,
} from "@/validations/user/UpdateProfile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import SendOTP from "../button/SendOTP"
import CustomPhoneInput from "../common/CustomPhoneInput"
import FormFooter from "../common/FormFooter"
import Label from "../input/Label"
import TextInputField from "../input/TextInput"

const UpdatePhoneNumber: React.FC<BaseUpdateUserProps> = ({ handleClose, user, setRefetch }) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<UpdatePhoneNumberSchemaType>({
        resolver: zodResolver(VerifyOTPSchema),
        defaultValues: {
            primary_phone: user?.primary_phone,
            country_code: user?.country_code,
            otp: "",
        },
    })

    const submitHandler = async (data: UpdatePhoneNumberSchemaType) => {
        try {
            const payload: Partial<UpdatePhoneNumberSchemaType> = data
            delete payload.primary_phone
            delete payload.country_code
            const url = new URL(
                `${CONFIG.API_ENDPOINTS.BASE_OTP_VERIFY}/${CONFIG.OTP_AND_VERIFY_ENDPOINTS.PHONE_NUMBER_UPDATE}`,
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
                    <Label isRequired label="Enter New Contact Number" />
                    <CustomPhoneInput
                        inputClass="form-control form-control-lg form-control-solid 1-100 w-100 custom-phone-input"
                        value={`${watch("country_code")}${watch("primary_phone")}`}
                        setPhoneNumberValue={(number) => setValue("primary_phone", number)}
                        setCountryCodeValue={(countryCode) => setValue("country_code", countryCode)}
                        clearPhoneNumberErrors={() => {
                            clearErrors("primary_phone")
                            clearErrors("country_code")
                        }}
                        setPhoneNumberErrors={() =>
                            setError("primary_phone", {
                                message: "Invalid phone number",
                            })
                        }
                        errorMessage={
                            (errors?.primary_phone?.message as string) ||
                            (errors?.country_code?.message as string)
                        }
                    />
                    <SendOTP
                        endpoint={CONFIG.OTP_AND_VERIFY_ENDPOINTS.PHONE_NUMBER_UPDATE}
                        customClassName="mt-2"
                        payload={watch()}
                        schema={SendPhoneNumberOTPSchema}
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
                    saveButtonTitle="Update Phone Number"
                    isSubmitting={isSubmitting}
                    handleCancelButton={handleClose}
                />
            </form>
        </>
    )
}

export default UpdatePhoneNumber
