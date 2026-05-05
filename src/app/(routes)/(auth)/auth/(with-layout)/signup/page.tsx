"use client"

import AuthHeader from "@/app/components/auth/AuthHeader"
import PrimaryButton from "@/app/components/button/PrimaryButton"
import Address from "@/app/components/common/Address"
import CustomPhoneInput from "@/app/components/common/CustomPhoneInput"
import ShowFormError from "@/app/components/common/ShowFormError"
import Label from "@/app/components/input/Label"
import TextInputField from "@/app/components/input/TextInput"
import { FetchHelper } from "@/services/FetchHelper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/Constants"
import { handleError } from "@/utils/HandleError"
import { executeWithRecaptcha, showSweetAlertWithRedirect } from "@/utils/Helpers"
import { SignupSchemaType, SignupValidationSchema } from "@/validations/auth/Signup"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFieldArray, useForm } from "react-hook-form"

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
        trigger,
        control,
    } = useForm<SignupSchemaType>({
        resolver: zodResolver(SignupValidationSchema),
        defaultValues: {
            address: [CONFIG.ADDRESS_DEFAULT_VALUE],
        },
    })

    const { fields: addressFields } = useFieldArray({ control, name: "address" })

    const submitHandler = async (data: SignupSchemaType) => {
        try {
            /**
             * We use a Promise here to ensure that the async signup logic inside
             * `executeWithRecaptcha` completes before the submitHandler itself resolves.
             *
             * The `executeWithRecaptcha` function expects a callback, but does not return a Promise.
             * By wrapping it in a new Promise and calling `resolve()` after the async logic finishes,
             * we allow the outer async/await flow (such as form submission state) to properly wait
             * for the entire signup and reCAPTCHA process to complete before proceeding.
             */
            await new Promise<void>((resolve) => {
                executeWithRecaptcha(async () => {
                    try {
                        const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.SIGNUP, data)
                        if (response?.status) {
                            showSweetAlertWithRedirect({
                                text: response.message,
                                icon: ALERT_ICON_TYPE.success,
                                router,
                                url: "/auth/login",
                            })
                        }
                        resolve()
                    } catch (error) {
                        handleError(error)
                    }
                })
            })
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
                                errorMsg={errors?.password1?.message}
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
                                                trigger(`address.${index}`)
                                            }
                                        }}
                                        errors={errors?.address?.[index]}
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
