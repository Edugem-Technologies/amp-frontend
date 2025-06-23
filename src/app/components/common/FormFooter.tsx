import React from "react"
import { FormFooterProps } from "@/types/common/FormFooter"
import CustomButton from "../button/Button"
import PrimaryButton from "../button/PrimaryButton"
import SecondaryButton from "../button/SecondaryButton"

const FormFooter: React.FC<FormFooterProps> = ({
    isSubmitting,
    handleBackButton,
    saveButtonTitle,
    saveButtonCustomClass,
    handleCancelButton,
}) => {
    return (
        <div className="d-flex justify-content-end gap-2 form-section mb-0">
            {/* To show cancel button */}
            {handleCancelButton && (
                <CustomButton
                    customClassName="cancel-button-class"
                    buttonTitle="Cancel"
                    type="button"
                    onClick={handleCancelButton}
                />
            )}
            {/* this is for showing back button */}
            {handleBackButton && (
                <SecondaryButton
                    buttonTitle="Back"
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleBackButton}
                />
            )}
            <PrimaryButton
                customClassName={saveButtonCustomClass}
                buttonTitle={saveButtonTitle ?? `Save & Continue`}
                type="submit"
                isSubmitting={isSubmitting}
            />
        </div>
    )
}

export default FormFooter
