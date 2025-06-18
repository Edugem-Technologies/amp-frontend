"use client"
import { PhonePasswordLoginSchema, PhonePasswordLoginSchemaType } from "@/validations/auth/Login"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import PrimaryButton from "../button/PrimaryButton"
import TextInputField from "../input/TextInput"
import Label from "../input/Label"
import CustomPhoneInput from "../common/CustomPhoneInput"

const PhonePasswordLogin = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<PhonePasswordLoginSchemaType>({
        resolver: zodResolver(PhonePasswordLoginSchema),
    })

    const onSubmit = (data: PhonePasswordLoginSchemaType) => {
        // Handle login logic here
        console.log("data", data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <>
                <div className="d-flex flex-column gap-4 mb-2">
                    <div className="">
                        <Label isRequired label="Contact Number" />
                        <CustomPhoneInput
                            inputClass="form-control form-control-lg form-control-solid 1-100 w-100 custom-phone-input"
                            value={`${watch("country_code")}${watch("primary_phone")}`}
                            setPhoneNumberValue={(number) => setValue("primary_phone", number)}
                            setCountryCodeValue={(countryCode) =>
                                setValue("country_code", countryCode)
                            }
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

export default PhonePasswordLogin
