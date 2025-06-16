import { Any } from "@/types/common/helper"
import TextInputField from "../input/TextInput"
import PrimaryButton from "../button/PrimaryButton"

const ForgotPasswordForm = ({ hookForm }: { hookForm: Any }) => {
    const {
        register,
        formState: { errors, isSubmitting },
    } = hookForm
    return (
        <>
            <div className="d-flex flex-column gap-4 mb-4">
                <div className="">
                    <TextInputField
                        label="Email Address"
                        isRequired
                        type="text"
                        placeholder=""
                        autoComplete="false"
                        className="form-control bg-transparent input-field-border"
                        errorMsg={errors?.primary_email?.message}
                        {...register("primary_email")}
                    />
                </div>
            </div>
            <div className="d-grid border-radius-10px ">
                <PrimaryButton type="submit" isSubmitting={isSubmitting} buttonTitle="Submit" />
            </div>
        </>
    )
}

export default ForgotPasswordForm
