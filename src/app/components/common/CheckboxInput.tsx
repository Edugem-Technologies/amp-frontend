/* eslint-disable react/display-name */
import { forwardRef } from "react"

import { InputHTMLAttributes } from "react"

export interface CheckBoxInputPropTypes extends InputHTMLAttributes<HTMLInputElement> {
    inputClassName?: string
}

export interface TicketCheckboxInputPropTypes extends CheckBoxInputPropTypes {
    checkmarkProps?: React.HTMLAttributes<HTMLSpanElement> | null
}

const CheckboxInput = forwardRef<HTMLInputElement, CheckBoxInputPropTypes>(
    ({ inputClassName, ...props }, ref) => {
        return (
            <input
                className={`form-check-input checkbox-input ${inputClassName || ""}`}
                ref={ref}
                {...props}
                type="checkbox"
            />
        )
    },
)

export default CheckboxInput
