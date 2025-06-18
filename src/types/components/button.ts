import React from "react"
import { SpinnerProps } from "react-bootstrap"

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    buttonTitle: string
    type?: "submit" | "button" | "reset"
    isSubmitting?: boolean
    customClassName?: string
    spinnerProps?: Pick<SpinnerProps, "size" | "variant" | "animation">
}
