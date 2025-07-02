"use client"
import { LoginFormProps } from "@/types/components/LoginsForm"
import { CONFIG } from "@/utils/constants"
import { PhoneOTPLoginSchemaType, PhoneOTPSendSchema } from "@/validations/auth/Login"
import { UseFormReturn } from "react-hook-form"
import SendOTP from "../button/SendOTP"
import CustomPhoneInput from "../common/CustomPhoneInput"
import Label from "../input/Label"
import TextInputField from "../input/TextInput"

const PhoneOTPLogin: React.FC<LoginFormProps> = ({ hookForm }) => {
    const {
        register,
        watch,
        setValue,
        clearErrors,
        setError,
        formState: { errors },
    } = hookForm as UseFormReturn<PhoneOTPLoginSchemaType>

    return (
        <>
            <div className="d-flex flex-column gap-4 mb-2">
                <div className="">
                    <Label isRequired label="Contact Number" />
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
                        endpoint={CONFIG.OTP_AND_VERIFY_ENDPOINTS.LOGIN}
                        customClassName="mt-2"
                        payload={watch()}
                        schema={PhoneOTPSendSchema}
                    />
                </div>

                <div className="">
                    <TextInputField
                        isRequired
                        label="OTP"
                        type="text"
                        autoComplete="off"
                        errorMsg={errors?.otp?.message}
                        className="custom-input"
                        {...register("otp")}
                    />
                </div>
            </div>
        </>
    )
}

export default PhoneOTPLogin
