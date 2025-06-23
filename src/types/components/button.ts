import React from "react"
import { SpinnerProps } from "react-bootstrap"
import { Any, AnyObject } from "../common/helper"
import { ZodSchema } from "zod"

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    buttonTitle: string
    type?: "submit" | "button" | "reset"
    isSubmitting?: boolean
    customClassName?: string
    spinnerProps?: Pick<SpinnerProps, "size" | "variant" | "animation">
    buttonContentClass?: string
}

export interface SendOTPProps extends Omit<ButtonProps, "buttonTitle"> {
    buttonTitle?: string
    payload: AnyObject
    schema?: ZodSchema<Any>
    endpoint: string
}
