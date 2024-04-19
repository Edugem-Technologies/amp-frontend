import React from "react"

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    title: string
    type: "submit" | "button" | "reset"
    isSubmitting?: boolean
}
