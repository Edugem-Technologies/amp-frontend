"use client"
import { FetchHelper } from "@/services/FetchHelper"
import { CONFIG } from "@/utils/Constants"
import { handleError } from "@/utils/HandleError"
import { showSweetAlert } from "@/utils/Helpers"
import { type ResetPassword, ResetPasswordSchema } from "@/validations/auth/ResetPassword"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../button/Button"
import TextInputField from "../input/TextInput"

export interface ResetPasswordType {
    handleClose: () => void
    userId: string
    setRefetch: Dispatch<SetStateAction<boolean>>
    userEmail: string
}
const ResetPassword: React.FC<ResetPasswordType> = ({ handleClose, userEmail }) => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPassword>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            old_password: "",
            new_password: "",
            confirm_new_password: "",
        },
    })

    const submitHandler = async (data: ResetPassword) => {
        try {
            setLoading(true)
            const payload = {
                ...data,
                email: userEmail,
            }
            // update API URL as per requirement
            const url = new URL(`${CONFIG.API_ENDPOINTS.CREATE_USER}`)
            await FetchHelper.post(url, payload)
            showSweetAlert({
                text: "Password updated successfully",
                icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon,
            })
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="card-body">
            <form
                id="kt_signin_change_password"
                className="form fv-plugins-bootstrap5 fv-plugins-framework"
                onSubmit={handleSubmit(submitHandler)}
            >
                <div className="row mb-1">
                    <div className="col-lg-4">
                        <div className="fv-row mb-0 fv-plugins-icon-container">
                            <TextInputField
                                label="Current Password"
                                labelClass="form-label fs-6 fw-bold mb-3"
                                type="password"
                                id="currentpassword"
                                required
                                errorMsg={errors?.old_password?.message}
                                {...register("old_password")}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="fv-row mb-0 fv-plugins-icon-container">
                            <TextInputField
                                label="New Password"
                                labelClass="form-label fs-6 fw-bold mb-3"
                                type="password"
                                required
                                id="newpassword"
                                errorMsg={errors?.new_password?.message}
                                {...register("new_password")}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="fv-row mb-0 fv-plugins-icon-container">
                            <TextInputField
                                label="Confirm New Password"
                                labelClass="form-label fs-6 fw-bold mb-3"
                                type="password"
                                required
                                id="confirmpassword"
                                errorMsg={errors?.confirm_new_password?.message}
                                {...register("confirm_new_password")}
                            />
                        </div>
                    </div>
                    {/* <div className="form-text mb-5">
                        Password must be at least 8 character and contain symbols
                    </div> */}
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <Button
                        type="submit"
                        className="btn btn-primary me-2 px-6 button-update-password custom-button-height"
                        isSubmitting={loading}
                        buttonTitle="Update Password"
                    />
                    <Button
                        type="button"
                        className="btn btn-secondary"
                        isSubmitting={loading}
                        buttonTitle="Cancel"
                        onClick={handleClose}
                    />
                </div>
            </form>
        </div>
    )
}

export default ResetPassword
