"use client"
import { EmailOTPLoginSchema, EmailOTPLoginSchemaType } from "@/validations/auth/Login"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import PrimaryButton from "../button/PrimaryButton"
import ShowFormError from "../common/ShowFormError"
import TextInputField from "../input/TextInput"

const EmailOTPLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EmailOTPLoginSchemaType>({
        resolver: zodResolver(EmailOTPLoginSchema),
    })

    const onSubmit = (data: EmailOTPLoginSchemaType) => {
        // Handle login logic here
        console.log("data", data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                        />
                        <ShowFormError message={errors?.primary_email?.message} />
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
                <div className="d-flex justify-content-end mb-4">
                    <Link legacyBehavior href="/auth/forgot-password">
                        <a className="font-size-14px">Forgot Password?</a>
                    </Link>
                </div>

                <div className="d-grid border-radius-10px">
                    <PrimaryButton type="submit" isSubmitting={isSubmitting} buttonTitle="Login" />
                </div>
            </>
        </form>
    )
}

export default EmailOTPLogin
