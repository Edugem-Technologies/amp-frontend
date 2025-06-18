import { InputHTMLAttributes } from "react"

export interface RadioInputPropTypes extends InputHTMLAttributes<HTMLInputElement> {
    inputClassName?: string
    label?: string
    isRequired?: boolean
    labelClass?: string
    errorMsg?: string
    containerClassName?: string
    name: string
}
