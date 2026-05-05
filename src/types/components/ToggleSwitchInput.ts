import { InputHTMLAttributes } from "react"

export interface ToggleSwitchInputPropTypes extends InputHTMLAttributes<HTMLInputElement> {
    inputClassName?: string
    label?: string
    isRequired?: boolean
    labelClass?: string
    errorMsg?: string
    containerClassName?: string
}
