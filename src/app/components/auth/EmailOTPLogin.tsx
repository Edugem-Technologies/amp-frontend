"use client"
import { LoginFormProps } from "@/types/components/LoginsForm"
import { CONFIG } from "@/utils/constants"
import { EmailOTPLoginSchemaType, EmailOTPSendSchema } from "@/validations/auth/Login"
import { UseFormReturn } from "react-hook-form"
import SendOTP from "../button/SendOTP"
import TextInputField from "../input/TextInput"

const EmailOTPLogin: React.FC<LoginFormProps> = ({ hookForm }) => {
    const {
        register,
        watch,
        formState: { errors },
    } = hookForm as UseFormReturn<EmailOTPLoginSchemaType>

    return (
        <>
            <div className="d-flex flex-column gap-4 mb-2">
                <div className="">
                    <TextInputField
                        label="Email Address"
                        isRequired
                        type="text"
                        autoComplete="false"
                        className="custom-input"
                        {...register("primary_email")}
                        errorMsg={errors?.primary_email?.message}
                    />
                    <SendOTP
                        endpoint={CONFIG.OTP_AND_VERIFY_ENDPOINTS.LOGIN}
                        customClassName="mt-2"
                        payload={watch()}
                        schema={EmailOTPSendSchema}
                    />
                </div>

                <div className="">
                    <TextInputField
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

export default EmailOTPLogin
