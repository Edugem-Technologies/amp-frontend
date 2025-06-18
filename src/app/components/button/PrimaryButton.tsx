import React from "react"
import { ButtonProps } from "@/types/components/button"
import CustomButton from "./Button"

const PrimaryButton: React.FC<ButtonProps> = ({
    buttonTitle,
    customClassName = "",
    isSubmitting,
    ...props
}) => {
    return (
        <CustomButton
            customClassName={`v-primary-btn btn-dark ${customClassName}`}
            isSubmitting={isSubmitting}
            buttonTitle={buttonTitle}
            {...props}
        />
    )
}

export default PrimaryButton
