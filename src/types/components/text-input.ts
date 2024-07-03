import { InputHTMLAttributes } from "react"

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    className?: string
    labelClass?: string
    errorMsg?: string
}
