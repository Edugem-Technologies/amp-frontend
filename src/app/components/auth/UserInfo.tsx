"use client"
import { useLocalStorageEffect } from "@/app/hooks/useLocalStorageEffect"
import { FetchHelper } from "@/services/fetch-helper"
import { User } from "@/types/auth/user"
import { CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { checkValidPhoneNumber, showSweetAlert } from "@/utils/helpers"
import { EditUser, EditUserInfoSchema } from "@/validations/auth/edit-user-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { CountryData } from "react-phone-input-2"
import Button from "../button/Button"
import CustomPhoneInput from "../common/CustomPhoneInput"
import CustomReactSelect from "../common/CustomReactSelect"
import RequiredField from "../common/RequiredField"
import ShowFormError from "../common/ShowFormError"
import TabBody from "../common/TabBody"
import TabHeader from "../common/TabHeader"
import TabSection from "../common/TabSection"
import TextInputField from "../input/TextInput"
import ResetPassword from "./ResetPassword"

export interface UserInfoProps {
    userInfo?: User | null
    setRefetch: Dispatch<SetStateAction<boolean>>
}
const UserInfo: React.FC<UserInfoProps> = ({ userInfo, setRefetch }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user_access] = useState(CONFIG.USER_ACCESS)
    const loggedInUserId = useLocalStorageEffect(CONFIG.LOCAL_STORAGE_VARIABLES.USER__UUID)
    const [userEditAccess, setUserEditAccess] = useState(false)
    const [phone] = useState("")
    const [country, setCountry] = useState<CountryData>()
    // const [showChangeEmail, setShowChangeEmail] = useState(false)
    const [showResetPassword, setShowResetPassword] = useState(false)

    const {
        control,
        register,
        handleSubmit,
        setValue,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<EditUser>({
        resolver: zodResolver(EditUserInfoSchema),
        defaultValues: {},
    })

    const getLoggedInUser = async () => {
        try {
            const response = await FetchHelper.get(CONFIG.API_ENDPOINTS.CREATE_USER, {
                user__uuid: loggedInUserId,
                page: 1,
                size: 10,
            })
            if (response?.result) {
                setUserEditAccess(
                    loggedInUserId === userInfo?.uuid ||
                        response?.result[0]?.user_access == "Admin",
                )
            }
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
        if (loggedInUserId) {
            getLoggedInUser()
        }
        // eslint-disable-next-line
    }, [loggedInUserId])

    const submitHandler = async (data: Partial<EditUser>) => {
        if (userEditAccess) {
            try {
                let payload: object = {
                    ...data,
                }
                if (data?.phone) {
                    const isValid = checkValidPhoneNumber({
                        country,
                        data: data?.phone_country_code + data?.phone,
                    })
                    if (isValid) {
                        clearErrors(`phone`)
                    } else {
                        setError(`phone`, { message: "Invalid phone number" })
                        return
                    }
                }
                payload = {
                    ...data,
                    phone: data?.phone,
                    phone_country_code: data?.phone_country_code,
                    first_name: data?.first_name,
                    last_name: data?.last_name,
                    username: data?.username,
                    email: data?.email,
                    user_access: data?.user_access,
                    uuid: userInfo?.uuid,
                }
                const url = new URL(
                    loggedInUserId === userInfo?.uuid
                        ? `${CONFIG.API_ENDPOINTS.CREATE_USER}`
                        : `${CONFIG.API_ENDPOINTS.CREATE_USER}`,
                )
                const response = await FetchHelper.post(url, payload)
                if (response?.uuid) {
                    showSweetAlert({
                        text: "User updated successfully",
                        icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon,
                    })
                    setRefetch((prev) => !prev)
                }
            } catch (error) {
                handleError(error)
            }
        }
    }

    return (
        <TabSection>
            <TabHeader heading="User Information" />
            <TabBody>
                <form
                    className="form fv-plugins-bootstrap5 fv-plugins-framework"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <div className="card-body">
                        <div className="row mb-3">
                            <label className="col-lg-2 col-form-label fw-semibold fs-6">
                                Username
                                <RequiredField />
                            </label>
                            <div className="col-lg-4">
                                <div className="row">
                                    <div className="col-lg-6 fv-row fv-plugins-icon-container">
                                        <TextInputField
                                            label=""
                                            type="text"
                                            placeholder="JOHN"
                                            errorMsg={errors?.username?.message}
                                            {...register("username")}
                                        />
                                        <div className="fv-plugins-message-container invalid-feedback"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-lg-2 col-form-label fw-semibold fs-6">
                                Full Name
                                <RequiredField />
                            </label>

                            <div className="col-lg-4">
                                <div className="row">
                                    <div className="col-lg-6 fv-row fv-plugins-icon-container">
                                        <TextInputField
                                            label=""
                                            type="text"
                                            placeholder="First name"
                                            errorMsg={errors?.first_name?.message}
                                            {...register("first_name")}
                                        />
                                        <div className="fv-plugins-message-container invalid-feedback"></div>
                                    </div>

                                    <div className="col-lg-6 fv-row fv-plugins-icon-container">
                                        <TextInputField
                                            label=""
                                            placeholder="Last name"
                                            errorMsg={errors?.last_name?.message}
                                            {...register("last_name")}
                                        />
                                        <div className="fv-plugins-message-container invalid-feedback"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-lg-2 col-form-label fw-semibold fs-6">
                                Email
                                <RequiredField />
                            </label>

                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-6 fv-row fv-plugins-icon-container">
                                        <TextInputField
                                            label=""
                                            type="text"
                                            placeholder="Email"
                                            errorMsg={errors?.email?.message}
                                            {...register("email")}
                                        />
                                        <div className="fv-plugins-message-container invalid-feedback"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-lg-2 col-form-label fw-semibold fs-6">
                                <span>
                                    User Access
                                    <RequiredField />
                                </span>
                            </label>

                            <div className="col-lg-4 fv-row fv-plugins-icon-container">
                                <Controller
                                    name={`user_access`}
                                    control={control}
                                    render={({ field }) => (
                                        <CustomReactSelect
                                            optionsData={user_access}
                                            isClearable
                                            // isDisabled={
                                            //     loggedInUserId === userInfo?.uuid ? true : false
                                            // }
                                            onDropdownChange={(newValue) =>
                                                field.onChange(newValue)
                                            }
                                            selectedOptionValue={field.value}
                                        />
                                    )}
                                />
                                <ShowFormError message={errors?.user_access?.message} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-lg-2 col-form-label fw-semibold fs-6">
                                <span>
                                    Contact Number
                                    <RequiredField />
                                </span>
                            </label>
                            <div className="col-lg-4 fv-row fv-plugins-icon-container">
                                <CustomPhoneInput
                                    country={country?.countryCode || ""}
                                    inputClass="form-control form-control-lg form-control-solid 1-100 w-100 custom-phone-input"
                                    setCountry={(country) => setCountry(country)}
                                    value={phone}
                                    setPhoneNumberValue={(value) => setValue(`phone`, value)}
                                    setCountryCodeValue={(countryCode) =>
                                        setValue(`phone_country_code`, countryCode)
                                    }
                                    clearPhoneNumberErrors={() => {
                                        clearErrors(`phone`)
                                        clearErrors(`phone_country_code`)
                                    }}
                                    setPhoneNumberErrors={() =>
                                        setError(`phone`, {
                                            message: "Invalid phone number",
                                        })
                                    }
                                    errorMessage={errors?.phone?.message as string}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end py-6 px-9">
                        <Link href="/users">
                            <Button
                                type="button"
                                buttonTitle="Discard"
                                className="btn btn-secondary me-2"
                            />
                        </Link>
                        <Button
                            type="submit"
                            className="btn btn-primary "
                            disabled={isSubmitting}
                            isSubmitting={isSubmitting}
                            buttonTitle="Save Changes"
                        />
                    </div>
                </form>
                <div className="d-flex flex-wrap align-items-center">
                    {showResetPassword ? (
                        <ResetPassword
                            userId={userInfo?.uuid as string}
                            handleClose={() => setShowResetPassword(false)}
                            setRefetch={setRefetch}
                            userEmail={userInfo?.email as string}
                        />
                    ) : (
                        <div className="card-body d-flex flex-wrap">
                            <div id="kt_signin_password">
                                <div className="fs-6 fw-bold mb-1">Password</div>
                                <div className="fw-semibold text-gray-600">************</div>
                            </div>
                            <div id="kt_signin_password_button" className="ms-auto">
                                <button
                                    type="button"
                                    className="btn btn-light btn-active-light-primary"
                                    onClick={() => setShowResetPassword(true)}
                                >
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </TabBody>
        </TabSection>
    )
}

export default UserInfo
