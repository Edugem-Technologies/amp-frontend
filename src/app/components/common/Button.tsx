import { ButtonProps } from "@/types/components/button"
import React from "react"
import { Spinner } from "react-bootstrap"

/**
 * Custom button component with optional spinner for loading state.
 * @param {ButtonProps} props - Props for the custom button.
 * @returns {JSX.Element} - Custom button element.
 */
const CustomButton: React.FC<ButtonProps> = ({
    title,
    className = "",
    type,
    isSubmitting,
    ...props
}) => {
    return (
        <button className={`v-custom-btn ${className}`} type={type} {...props}>
            {" "}
            {isSubmitting ? <Spinner variant="light" /> : title}
        </button>
    )
}

export default CustomButton
