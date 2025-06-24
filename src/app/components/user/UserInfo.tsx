"use client"
import { useAppContext } from "@/app/context/AppContext"
import { AddressTypeEnum } from "@/enums/AddressTypeEnum"
import { FetchHelper } from "@/services/fetch-helper"
import { User } from "@/types/auth/User"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { getKeyFromEnumValue, setEncryptedLocalStorageData, showSweetAlert } from "@/utils/helpers"
import { UpdateProfileSchema, UpdateProfileSchemaType } from "@/validations/user/UpdateProfile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import PrimaryButton from "../button/PrimaryButton"
import Address from "../common/Address"
import FormFooter from "../common/FormFooter"
import ShowFormError from "../common/ShowFormError"
import TabBody from "../common/TabBody"
import Label from "../input/Label"
import RoleSelect from "../input/RoleSelect"
import TextInputField from "../input/TextInput"
import UpdateEmail from "./UpdateEmail"
import UpdatePassword from "./UpdatePassword"
import UpdatePhoneNumber from "./UpdatePhoneNumber"

export interface UserInfoProps {
    userInfo?: User | null
    setRefetch: Dispatch<SetStateAction<boolean>>
}
const UserInfo = () => {
    const router = useRouter()
    const { user } = useAppContext()
    const [showUpdatePassword, setShowUpdatePassword] = useState(false)
    const [showUpdateEmail, setShowUpdateEmail] = useState(false)
    const [showUpdatePhoneNumber, setShowUpdatePhoneNumber] = useState(false)
    const {
        control,
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<UpdateProfileSchemaType>({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: {
            // country_code: user?.country_code,
            // primary_phone: user?.primary_phone,
            first_name: user?.first_name,
            last_name: user?.last_name,
            roles: user?.roles?.length
                ? user?.roles?.map((role) => {
                      return {
                          label: role?.name,
                          value: role?.uuid,
                          data: role,
                      }
                  })
                : [],
            address: user?.address_detail.length
                ? user.address_detail.map((address) => {
                      return {
                          uuid: address?.uuid ?? null,
                          address: address?.address,
                          address_type: {
                              label: getKeyFromEnumValue({
                                  value: address?.address_type,
                                  enumObject: AddressTypeEnum,
                              }),
                              value: address?.address_type,
                              data: {
                                  label: getKeyFromEnumValue({
                                      value: address?.address_type,
                                      enumObject: AddressTypeEnum,
                                  }),
                                  value: address?.address_type,
                              },
                          },
                          pincode: address?.pincode,
                          city: address?.city,
                          state: address?.state,
                          country: address?.country,
                      }
                  })
                : [CONFIG.ADDRESS_DEFAULT_VALUE],
        },
    })
    const { fields: addressFields, remove, append } = useFieldArray({ control, name: "address" })

    const submitHandler = async (data: UpdateProfileSchemaType) => {
        try {
            const updatedAddressData = data?.address?.map((address) => {
                if (!address?.uuid) {
                    // Create a shallow copy and delete the uuid field if it's null or undefined
                    const updatedAddress = { ...address }
                    delete updatedAddress.uuid
                    return updatedAddress
                }
                return address
            })
            const payload = {
                ...data,
                address: updatedAddressData,
            }
            const response = await FetchHelper.patch(
                CONFIG.API_ENDPOINTS.UPDATE_USER_DETAILS,
                payload,
            )
            if (response?.status) {
                showSweetAlert({
                    text: response?.message,
                    icon: ALERT_ICON_TYPE.success,
                })
                setEncryptedLocalStorageData(
                    CONFIG.LOCAL_STORAGE_VARIABLES.USER_DATA,
                    response?.data,
                )

                // setRefetch((prev) => !prev)
            }
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <TabBody>
            <form className="card-body pb-0" onSubmit={handleSubmit(submitHandler)}>
                <div className="row form-section">
                    <div className="col-md-12 form-section-title">Basic Details</div>
                    <div className="col-md-3">
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
                    <div className="col-md-3">
                        <TextInputField
                            label="Last Name"
                            type="text"
                            autoComplete="false"
                            inputFieldClassName="custom-input"
                            inputContainerClass="form-field"
                            {...register("last_name")}
                        />
                        <ShowFormError message={errors?.last_name?.message} />
                    </div>
                    <div className="col-md-3">
                        <Label isRequired label="Role" />
                        <Controller
                            name={`roles`}
                            control={control}
                            render={({ field }) => (
                                <>
                                    <RoleSelect
                                        isMulti
                                        onSelected={(role) => field.onChange(role)}
                                        label=""
                                        selectedOptionValue={field.value}
                                    />
                                </>
                            )}
                        />
                        <ShowFormError message={errors.roles?.message} />
                    </div>
                </div>
                <div className="row form-section">
                    <div className="col-md-12 form-section-title">Address Details</div>
                    {addressFields.map((addressField, index) => {
                        return (
                            <>
                                <Address
                                    showAddMore={true}
                                    append={append}
                                    remove={remove}
                                    fieldLength={addressFields.length}
                                    index={index}
                                    inputColClass="col-md-3"
                                    addMoreSectionCustomClass="col-md-12"
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

                <FormFooter
                    isSubmitting={isSubmitting}
                    handleCancelButton={() => router.push("/users")}
                    saveButtonTitle="Save"
                />
            </form>
            <hr />
            <div>
                {showUpdateEmail ? (
                    <UpdateEmail handleClose={() => setShowUpdateEmail(false)} />
                ) : (
                    <div className="form-section d-flex flex-wrap mb-0">
                        <div className="col-md-12 form-section-title">
                            <div className="mb-1">Email Address</div>
                            <div className="fw-normal text-muted fs-6">{user?.primary_email}</div>
                        </div>
                        <div className="ms-auto">
                            <PrimaryButton
                                buttonTitle="Update Email"
                                onClick={() => setShowUpdateEmail(true)}
                            />
                        </div>
                    </div>
                )}
            </div>
            <hr />
            <div>
                {showUpdatePhoneNumber ? (
                    <UpdatePhoneNumber handleClose={() => setShowUpdatePhoneNumber(false)} />
                ) : (
                    <div className="form-section d-flex flex-wrap mb-0">
                        <div className="col-md-12 form-section-title">
                            <div className="mb-1">Phone Number</div>
                            <div className="fw-normal text-muted fs-6">
                                {`${user?.country_code ?? ""} ${user?.primary_phone ?? ""}`}
                            </div>
                        </div>
                        <div className="ms-auto">
                            <PrimaryButton
                                buttonTitle="Update Phone Number"
                                onClick={() => setShowUpdatePhoneNumber(true)}
                            />
                        </div>
                    </div>
                )}
            </div>
            <hr />
            <div>
                {showUpdatePassword ? (
                    <UpdatePassword handleClose={() => setShowUpdatePassword(false)} />
                ) : (
                    <div className="form-section d-flex flex-wrap">
                        <div className="col-md-12 form-section-title">
                            <div className="mb-1">Password</div>
                            <div className="fw-normal text-muted fs-6">************</div>
                        </div>
                        <div className="ms-auto">
                            <PrimaryButton
                                buttonTitle="Update Password"
                                onClick={() => setShowUpdatePassword(true)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </TabBody>
    )
}

export default UserInfo
