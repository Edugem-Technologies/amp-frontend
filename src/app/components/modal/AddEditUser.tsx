"use client"
import { useMutateData } from "@/app/hooks/useFetchHelper"
import { CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { checkValidPhoneNumber, showSweetAlert } from "@/utils/helpers"
import { AddUser, AddUserSchema } from "@/validations/auth/add-user-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Modal } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form"
import { CountryData } from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { SweetAlertIcon } from "sweetalert2"
import Button from "../button/Button"
import CustomPhoneInput from "../common/CustomPhoneInput"
import CustomReactSelect from "../common/CustomReactSelect"
import RequiredField from "../common/RequiredField"
import ShowFormError from "../common/ShowFormError"
import TextInputField from "../input/TextInput"

export interface AddUserModalPropType {
    handleClose: () => void
    onUserAdded: () => void
}

const AddEditUser: React.FC<Partial<AddUserModalPropType>> = ({ handleClose, onUserAdded }) => {
    const [roles] = useState(CONFIG.USER_ACCESS)
    const [country, setCountry] = useState<CountryData>()
    const router = useRouter()
    const { mutate, isPending } = useMutateData({
        method: "post",
        url: CONFIG.API_ENDPOINTS.CREATE_USER,
        queryKeys: ["users"],
        tanstackMutateOptions: {
            onSuccess: () => {
                onUserAdded && onUserAdded()
                handleClose && handleClose()
                showSweetAlert({
                    text: "User added successfully",
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                })
            },
            onError: (error) => {
                handleError(error)
            },
        },
    })

    const {
        register,
        handleSubmit,
        setValue,
        control,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<AddUser>({
        resolver: zodResolver(AddUserSchema),
        defaultValues: {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            user_access: "",
            phone_country_code: "",
            phone: "",
        },
    })

    // const getRoles = async () => {
    //     try {
    //         const response = (await FetchHelper.get(CONFIG.API_ENDPOINTS.ROLE)) as {
    //             results: Role[]
    //         }
    //         if (response.results) {
    //             const data = response.results.map((item) => ({ label: item.name, value: item.id }))
    //             setRoles(data)
    //         }
    //     } catch (error) {
    //         handleError(error)
    //     }
    // }

    const submitHandler = async (data: AddUser) => {
        try {
            const payload = {
                ...data,
            }
            if (data?.phone) {
                const isValid = checkValidPhoneNumber({
                    country: country as object,
                    data: data.phone_country_code + data.phone,
                })
                if (isValid) {
                    clearErrors(`phone`)
                } else {
                    setError(`phone`, { message: "Invalid phone number" })
                    return
                }
            }
            mutate({ data: payload })
        } catch (error) {
            handleError(error)
        }
    }

    // useEffect(() => {
    //     getRoles()
    // }, [])

    const handleCancel = () => {
        if (handleClose) {
            handleClose()
        } else {
            router.back()
        }
    }

    return (
        <Modal show onHide={handleCancel}>
            <form onSubmit={handleSubmit(submitHandler)} className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title text-primary fw-bold">Add New User</h5>
                </div>

                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <TextInputField
                                label="Username"
                                className="text-uppercase"
                                placeholder="JOHN"
                                required
                                autoComplete="off"
                                maxLength={255}
                                errorMsg={errors.username?.message}
                                {...register("username")}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                User Access <RequiredField />
                            </label>
                            <Controller
                                name={`user_access`}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <CustomReactSelect
                                            optionsData={roles}
                                            isClearable
                                            onDropdownChange={(newValue) =>
                                                field.onChange(newValue)
                                            }
                                            selectedOptionValue={field.value}
                                        />
                                    </>
                                )}
                            />
                            <ShowFormError message={errors.user_access?.message} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <TextInputField
                                label="First Name"
                                required
                                autoComplete="off"
                                placeholder="John"
                                maxLength={255}
                                errorMsg={errors.first_name?.message}
                                {...register("first_name")}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <TextInputField
                                label="Last Name"
                                placeholder="Doe"
                                required
                                autoComplete="off"
                                maxLength={255}
                                errorMsg={errors.last_name?.message}
                                {...register("last_name")}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <TextInputField
                                label="Email"
                                required
                                autoComplete="off"
                                placeholder="john@gmaill.com"
                                errorMsg={errors.email?.message}
                                {...register("email")}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <TextInputField
                                label="Password"
                                required
                                autoComplete="off"
                                type="password"
                                errorMsg={errors.password?.message}
                                {...register("password")}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <TextInputField
                                label="Confirm Password"
                                required
                                autoComplete="off"
                                type="password"
                                errorMsg={errors.confirm_password?.message}
                                {...register("confirm_password")}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Contact Number
                                <RequiredField />
                            </label>
                            <CustomPhoneInput
                                inputClass="form-control form-control-lg form-control-solid 1-100 w-100 custom-phone-input"
                                setCountry={(country) => setCountry(country)}
                                value=""
                                setPhoneNumberValue={(number) => setValue(`phone`, number)}
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
                                errorMessage={
                                    (errors?.phone?.message as string) ||
                                    (errors?.phone_country_code?.message as string)
                                }
                            />
                        </div>
                    </div>
                </div>

                <div
                    className={`modal-footer ${
                        handleClose ? "" : "d-flex gap-2 align-items-center mt-5"
                    }`}
                >
                    <button type="button" className="btn btn-light" onClick={handleCancel}>
                        Close
                    </button>

                    <Button
                        buttonTitle="Save Changes"
                        isSubmitting={isPending || isSubmitting}
                        type="submit"
                        className="btn btn-primary"
                        id="submit-show"
                    />
                </div>
            </form>
        </Modal>
    )
}

export default AddEditUser
