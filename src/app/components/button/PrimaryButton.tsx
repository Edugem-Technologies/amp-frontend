import { ButtonProps } from "@/types/components/Button"
import React from "react"
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
