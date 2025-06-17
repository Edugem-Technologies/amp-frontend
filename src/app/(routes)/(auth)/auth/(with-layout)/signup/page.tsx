"use client"

import AuthHeader from "@/app/components/auth/AuthHeader"
import PrimaryButton from "@/app/components/button/PrimaryButton"
import Address from "@/app/components/common/Address"
import CustomPhoneInput from "@/app/components/common/CustomPhoneInput"
import ShowFormError from "@/app/components/common/ShowFormError"
import Label from "@/app/components/input/Label"
import TextInputField from "@/app/components/input/TextInput"
import { FetchHelper } from "@/services/fetch-helper"
import { CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { showSweetAlertWithRedirect } from "@/utils/helpers"
import { SignupSchemaType, SignupValidationSchema } from "@/validations/auth/signup"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFieldArray, useForm } from "react-hook-form"
import { SweetAlertIcon } from "sweetalert2"

const Login = () => {
    const router = useRouter()

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        watch,
        setValue,
        clearErrors,
        setError,
        control,
    } = useForm<SignupSchemaType>({
        resolver: zodResolver(SignupValidationSchema),
        defaultValues: {
            address: [
                {
                    address: "",
                    address_type: null,
                    city: null,
                    country: null,
                    pincode: null,
                    state: null,
                },
            ],
        },
    })

    const { fields: addressFields } = useFieldArray({ control, name: "address" })

    const submitHandler = async (data: SignupSchemaType) => {
        try {
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.SIGNUP, data)
            if (response?.status) {
                showSweetAlertWithRedirect({
                    text: response.message,
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                    router,
                    url: "/auth/login",
                })
            }
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <form className="form w-100" onSubmit={handleSubmit(submitHandler)}>
            <AuthHeader title={CONFIG.SIGN_UP_TITLE} />
            <>
                <div className="d-flex flex-column gap-4 mb-2 form-section">
                    <div className="row form-subsection">
                        <div className="col-md-6">
                            <TextInputField
                                label="First Name"
                                isRequired
                                type="text"
                                autoComplete="false"
                                inputFieldClassName="custom-input"
                                inputContainerClass="form-field"
                                {...register("first_name")}
                            />
                            <ShowFormError message={errors?.first_name?.message} />
                        </div>
                        <div className="col-md-6">
                            <TextInputField
                                label="Last Name"
                                isRequired
                                type="text"
                                autoComplete="false"
                                inputFieldClassName="custom-input"
                                inputContainerClass="form-field"
                                {...register("last_name")}
                            />
                            <ShowFormError message={errors?.last_name?.message} />
                        </div>
                        <div className="col-md-6">
                            <TextInputField
                                label="Email Address"
                                isRequired
                                type="text"
                                autoComplete="false"
                                inputFieldClassName="custom-input"
                                inputContainerClass="form-field"
                                {...register("primary_email")}
                            />
                            <ShowFormError message={errors?.primary_email?.message} />
                        </div>
                        <div className="col-md-6">
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

                        <div className="col-md-6">
                            <TextInputField
                                label="Password"
                                type="password"
                                autoComplete="off"
                                errorMsg={errors?.password?.message}
                                inputFieldClassName="custom-input"
                                {...register("password")}
                            />
                        </div>
                        <div className="col-md-6">
                            <TextInputField
                                label="Confirm Password"
                                type="password"
                                autoComplete="off"
                                errorMsg={errors?.password?.message}
                                inputFieldClassName="custom-input"
                                {...register("password1")}
                            />
                        </div>
                        {addressFields.map((addressField, index) => {
                            return (
                                <>
                                    <Address
                                        key={addressField.id}
                                        onChange={(address) => {
                                            if (address) {
                                                setValue(`address.${index}`, address)
                                            }
                                        }}
                                        errorMessage={errors?.address?.message?.toString()}
                                        addressValue={watch("address")?.[index]}
                                    />
                                </>
                            )
                        })}
                    </div>
                </div>

                <div className="d-flex justify-content-end mb-4">
                    <span>
                        Already have an account? <Link href="/auth/login">Login</Link>
                    </span>
                </div>

                <div className="d-grid border-radius-10px">
                    <PrimaryButton
                        type="submit"
                        isSubmitting={isSubmitting}
                        buttonTitle="Sign Up"
                    />
                </div>
            </>
        </form>
    )
}

export default Login
