import React from "react"
import CustomButton from "./Button"
import { ButtonProps } from "@/types/components/button"

const SecondaryButton: React.FC<ButtonProps> = ({
    buttonTitle,
    customClassName = "",
    isSubmitting,
    ...props
}) => {
    return (
        <CustomButton
            customClassName={`btn btn-secondary ${customClassName}`}
            isSubmitting={isSubmitting}
            buttonTitle={buttonTitle}
            {...props}
        />
    )
}

export default SecondaryButton
