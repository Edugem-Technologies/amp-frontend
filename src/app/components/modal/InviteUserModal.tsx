"use client"
import { FetchHelper } from "@/services/fetch-helper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { showSweetAlert } from "@/utils/helpers"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import ShowFormError from "../common/ShowFormError"
import TabBody from "../common/TabBody"
import Label from "../input/Label"
import TextInputField from "../input/TextInput"
import ModalWrapper from "./ModalWrapper"
import PermissionGuard from "../auth/PermissionGuard"
import { permissionJSON } from "@/fixtures/Permission"
import ModalFooter from "./ModalFooter"
import { DefaultModalPropType } from "@/types/components/Modal"
import { InviteUserSchema, InviteUserSchemaType } from "@/validations/user/InviteUser"
import RoleSelect from "../input/RoleSelect"

const InviteUserModal: React.FC<DefaultModalPropType> = ({ onClose, onAdded }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<InviteUserSchemaType>({
        resolver: zodResolver(InviteUserSchema),
    })

    const submitHandler = async (data: InviteUserSchemaType) => {
        try {
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.INVITE_USER, data)

            if (response?.status) {
                showSweetAlert({
                    icon: ALERT_ICON_TYPE.success,
                    text: response.message,
                })
            }
            onAdded && onAdded()

            onClose()
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <PermissionGuard requiredPermissions={[permissionJSON.USER.permissions.MANAGE.code]}>
            <ModalWrapper modalTitle="Invite User" onClose={onClose}>
                <TabBody stopVh>
                    <form className="card-body" onSubmit={handleSubmit(submitHandler)}>
                        <div className="row mb-4 form-section">
                            <div className="col-12">
                                <TextInputField
                                    label="First Name"
                                    isRequired
                                    errorMsg={errors.first_name?.message}
                                    {...register("first_name")}
                                />
                            </div>
                            <div className="col-12">
                                <TextInputField
                                    label="Last Name"
                                    errorMsg={errors.last_name?.message}
                                    {...register("last_name")}
                                />
                            </div>
                            <div className="col-12">
                                <TextInputField
                                    label="Email"
                                    isRequired
                                    errorMsg={errors.primary_email?.message}
                                    {...register("primary_email")}
                                />
                            </div>

                            <div className="col-12">
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
                        <hr />
                        <ModalFooter isSubmitting={isSubmitting} buttonTitle="Save" />
                    </form>
                </TabBody>
            </ModalWrapper>
        </PermissionGuard>
    )
}

export default InviteUserModal
