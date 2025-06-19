"use client"
import { LoginFormProps } from "@/types/components/LoginsForm"
import { EmailPasswordLoginSchemaType } from "@/validations/auth/Login"
import { UseFormReturn } from "react-hook-form"
import TextInputField from "../input/TextInput"

const EmailPasswordLogin: React.FC<LoginFormProps> = ({ hookForm }) => {
    const {
        register,
        formState: { errors },
    } = hookForm as UseFormReturn<EmailPasswordLoginSchemaType>

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
                </div>

                <div className="">
                    <TextInputField
                        label="Password"
                        type="password"
                        autoComplete="off"
                        errorMsg={errors?.password?.message}
                        className="custom-input"
                        {...register("password")}
                    />
                </div>
            </div>
        </>
    )
}

export default EmailPasswordLogin
