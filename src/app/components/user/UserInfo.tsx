"use client"
import { useAppContext } from "@/app/context/AppContext"
import { usePermissions } from "@/app/context/PermissionContext"
import { AddressTypeEnum } from "@/enums/AddressTypeEnum"
import { DocumentTypeEnum } from "@/enums/DocumentTypeEnum"
import { ModuleTypeEnum } from "@/enums/ModuleTypeEnum"
import { permissionJSON } from "@/fixtures/Permission"
import { FetchHelper } from "@/services/fetch-helper"
import { User } from "@/types/auth/User"
import { Any, AnyObject } from "@/types/common/helper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import {
    createFileObjectForS3Upload,
    getFileUrl,
    getKeyFromEnumValue,
    handleUploadFile,
    hasAccessPermission,
    setEncryptedLocalStorageData,
    setEncryptedSessionStorageData,
    showSweetAlert,
} from "@/utils/helpers"
import { UpdateProfileSchema, UpdateProfileSchemaType } from "@/validations/user/UpdateProfile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import PrimaryButton from "../button/PrimaryButton"
import Address from "../common/Address"
import FormFooter from "../common/FormFooter"
import ImageEdit from "../common/ImageEdit"
import ShowFormError from "../common/ShowFormError"
import TabBody from "../common/TabBody"
import Label from "../input/Label"
import RoleSelect from "../input/RoleSelect"
import TextInputField from "../input/TextInput"
import UpdateEmail from "./UpdateEmail"
import UpdatePassword from "./UpdatePassword"
import UpdatePhoneNumber from "./UpdatePhoneNumber"
import ToggleSwitchInput from "../input/ToggleSwitchInput"
import AuthModal from "../modal/AuthModal"
import TwoFactorSettingsModal from "../modal/TwoFactorSettingsModal"

const UserInfo = () => {
    const router = useRouter()
    const params = useParams()
    const user_uuid = params?.id
    const [showUpdatePassword, setShowUpdatePassword] = useState(false)
    const [showUpdateEmail, setShowUpdateEmail] = useState(false)
    const [showUpdatePhoneNumber, setShowUpdatePhoneNumber] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [refetch, setRefetch] = useState(false)
    const { user: loggedInUser, setUser: setLoggedInUser } = useAppContext()
    const { userPermissions } = usePermissions()
    const {
        control,
        register,
        handleSubmit,
        setValue,
        watch,
        setError,
        clearErrors,
        trigger,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdateProfileSchemaType>({
        resolver: zodResolver(UpdateProfileSchema),
    })
    const [isMFAEnabled, setIsMFAEnabled] = useState(!!loggedInUser?.has_2fa_enabled)
    const [isMFASettingsModalOpen, setIsMFASettingsModalOpen] = useState(false)

    const updatedLoggedInUserInfo = useCallback(({ data }: { data: User }) => {
        if (loggedInUser?.uuid === user_uuid) {
            setEncryptedLocalStorageData(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DATA, data)
            setLoggedInUser(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const { fields: addressFields, remove, append } = useFieldArray({ control, name: "address" })
    const submitHandler = async (data: UpdateProfileSchemaType) => {
        try {
            let documents = watch("document") ? [watch("document")] : []

            if (watch("document")?.local_uuid) {
                const updatedProfilePicture = await handleUploadFile({
                    fileToUpload: [watch("document")],
                    documentType: DocumentTypeEnum.PROFILE_IMAGE,
                    moduleType: ModuleTypeEnum.USER,
                })
                documents = updatedProfilePicture
            }

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
                document: documents,
                address: updatedAddressData,
            }
            const url = new URL(`${CONFIG.API_ENDPOINTS.BASE_USER}/${user_uuid}/update`)
            const response = await FetchHelper.patch(url, payload)
            if (response?.status) {
                showSweetAlert({
                    text: response?.message,
                    icon: ALERT_ICON_TYPE.success,
                })
                const profileImageURL = await getFileUrl(response?.data?.document[0])
                setEncryptedSessionStorageData(
                    CONFIG.SESSION_STORAGE_VARIABLES.PROFILE_IMAGE_URL,
                    profileImageURL,
                )
                updatedLoggedInUserInfo({ data: response?.data })

                // setRefetch((prev) => !prev)
            }
        } catch (error) {
            handleError(error)
        }
    }

    const getUserDetails = async () => {
        try {
            setLoading(true)
            const url = new URL(`${CONFIG.API_ENDPOINTS.BASE_USER}/${user_uuid}/details`)
            const response: { data: User; status: boolean } = await FetchHelper.get(url)
            if (response?.status) {
                setUser(response?.data)
                const defaultValues = {
                    first_name: response?.data?.first_name,
                    last_name: response?.data?.last_name,
                    roles: response?.data?.roles?.length
                        ? response?.data?.roles?.map((role) => {
                              return {
                                  label: role?.name,
                                  value: role?.uuid,
                                  data: role,
                              }
                          })
                        : [],
                    address: response?.data?.address_detail.length
                        ? response?.data?.address_detail.map((address) => {
                              return {
                                  uuid: address?.uuid ?? null,
                                  address: address?.address,
                                  address_type: address?.address_type
                                      ? {
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
                                        }
                                      : null,
                                  pincode: address?.pincode,
                                  city: address?.city,
                                  state: address?.state,
                                  country: address?.country,
                              }
                          })
                        : [CONFIG.ADDRESS_DEFAULT_VALUE],
                    document: response?.data?.document?.[0],
                }
                updatedLoggedInUserInfo({ data: response?.data })
                reset(defaultValues)
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refetch])

    useEffect(() => {
        setIsMFAEnabled(!!loggedInUser?.has_2fa_enabled)
    }, [loggedInUser])

    return (
        <TabBody loading={loading}>
            <form className="card-body pb-0" onSubmit={handleSubmit(submitHandler)}>
                <div className="row form-section">
                    <div className="col-md-12 form-section-title">Basic Details</div>
                    <div className="row">
                        <div className="col-md-3">
                            <Label label="Profile Image" />
                            <br />
                            <Controller
                                control={control}
                                name="document"
                                render={({ field }) => (
                                    <ImageEdit
                                        type={CONFIG.FILE_TYPE.IMAGE}
                                        disabled={isSubmitting}
                                        onDrop={async (_file: Any) => {
                                            const fileObject = createFileObjectForS3Upload(_file)

                                            setValue("document", fileObject)

                                            clearErrors("document")
                                        }}
                                        onError={(errors: AnyObject) => {
                                            switch (errors?.code) {
                                                case CONFIG.CODE.INVALID_FILE_TYPE:
                                                    setError("document", {
                                                        message:
                                                            CONFIG.VALIDATIONS.MESSAGE
                                                                .ONLY_JPG_PNG_JPEG_ALLOWED,
                                                    })
                                                    break

                                                default:
                                                    setError("document", {
                                                        message: errors?.message,
                                                    })
                                                    break
                                            }
                                        }}
                                        onFileRemove={() => {
                                            field.onChange(null)
                                        }}
                                        file={field.value}
                                        innerDivcustomClass="d-flex align-items-center"
                                    />
                                )}
                            />

                            <ShowFormError message={errors?.document?.message?.toString()} />
                        </div>
                    </div>
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
                                        // Disable the RoleSelect input unless the current user has the "MANAGE" permission for users.
                                        // This ensures that only users with sufficient privileges (such as admins) can modify user roles.
                                        isDisabled={
                                            !hasAccessPermission({
                                                userPermissions,
                                                requiredPermissions: [
                                                    permissionJSON.USER.permissions.MANAGE.code,
                                                ],
                                            })
                                        }
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
                    <UpdateEmail
                        handleClose={() => setShowUpdateEmail(false)}
                        user={user}
                        setRefetch={setRefetch}
                    />
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
                    <UpdatePhoneNumber
                        handleClose={() => setShowUpdatePhoneNumber(false)}
                        user={user}
                        setRefetch={setRefetch}
                    />
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
            <hr />
            <div className="row form-section">
                <div className="col-md-12 form-section-title">Others</div>
                <div className="col-md-3 d-flex gap-3 align-items-center">
                    <Label label="MFA:" />
                    <ToggleSwitchInput
                        inputClassName="ms-0"
                        containerClassName="mb-2"
                        label=""
                        checked={isMFAEnabled}
                        onChange={() => {
                            setIsMFASettingsModalOpen(true)
                        }}
                    />
                </div>
            </div>
            {isMFASettingsModalOpen && (
                <TwoFactorSettingsModal
                    onClose={() => setIsMFASettingsModalOpen(false)}
                    isMFAEnabled={isMFAEnabled}
                    onAdded={() => setRefetch((prev) => !prev)}
                />
            )}
        </TabBody>
    )
}

export default UserInfo
