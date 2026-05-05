import { ButtonProps } from "@/types/components/Button"
import React from "react"
import CustomButton from "./Button"

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
