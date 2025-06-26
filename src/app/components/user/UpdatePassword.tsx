"use client"
import { FetchHelper } from "@/services/fetch-helper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { showSweetAlert } from "@/utils/helpers"
import { UpdatePasswordSchema, UpdatePasswordSchemaType } from "@/validations/user/UpdateProfile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import FormFooter from "../common/FormFooter"
import TextInputField from "../input/TextInput"
import { useParams } from "next/navigation"

const UpdatePassword: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UpdatePasswordSchemaType>({
        resolver: zodResolver(UpdatePasswordSchema),
        defaultValues: {
            current_password: "",
            new_password: "",
            confirm_password: "",
        },
    })
    const params = useParams()
    const user_uuid = params?.id

    const submitHandler = async (data: UpdatePasswordSchemaType) => {
        try {
            const payload: Partial<UpdatePasswordSchemaType> = data
            delete payload.confirm_password
            const url = new URL(`${CONFIG.API_ENDPOINTS.BASE_USER}/${user_uuid}/update/password`)
            const response = await FetchHelper.patch(url, payload)
            if (response?.status) {
                showSweetAlert({
                    icon: ALERT_ICON_TYPE.success,
                    text: response.message,
                })
                handleClose()
            }
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <>
            <form className="row form-section" onSubmit={handleSubmit(submitHandler)}>
                <div className="col-md-3">
                    <TextInputField
                        label="Current Password"
                        isRequired
                        type="password"
                        autoComplete="false"
                        inputFieldClassName="custom-input"
                        inputContainerClass="form-field"
                        {...register("current_password")}
                        errorMsg={errors?.current_password?.message}
                    />
                </div>
                <div className="col-md-3">
                    <TextInputField
                        label="New Password"
                        isRequired
                        type="password"
                        autoComplete="false"
                        inputFieldClassName="custom-input"
                        inputContainerClass="form-field"
                        {...register("new_password")}
                        errorMsg={errors?.new_password?.message}
                    />
                </div>
                <div className="col-md-3">
                    <TextInputField
                        label="Confirm New Password"
                        isRequired
                        type="password"
                        autoComplete="false"
                        inputFieldClassName="custom-input"
                        inputContainerClass="form-field"
                        {...register("confirm_password")}
                        errorMsg={errors?.confirm_password?.message}
                    />
                </div>
                <FormFooter
                    saveButtonTitle="Update Password"
                    isSubmitting={isSubmitting}
                    handleCancelButton={handleClose}
                />
            </form>
        </>
    )
}

export default UpdatePassword
