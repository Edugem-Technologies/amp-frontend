"use client"
import { LoginFormProps } from "@/types/components/LoginsForm"
import { PhonePasswordLoginSchemaType } from "@/validations/auth/Login"
import { UseFormReturn } from "react-hook-form"
import CustomPhoneInput from "../common/CustomPhoneInput"
import Label from "../input/Label"
import TextInputField from "../input/TextInput"

const PhonePasswordLogin: React.FC<LoginFormProps> = ({ hookForm }) => {
    const {
        register,
        watch,
        setValue,
        clearErrors,
        setError,
        formState: { errors },
    } = hookForm as UseFormReturn<PhonePasswordLoginSchemaType>

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
                </div>

                <div className="">
                    <TextInputField
                        label="Password"
                        type="password"
                        isRequired
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

export default PhonePasswordLogin
