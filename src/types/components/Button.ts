import { ModuleTypeEnum } from "@/enums/ModuleTypeEnum"
import React from "react"
import { SpinnerProps } from "react-bootstrap"
import { ZodSchema } from "zod"
import { Any, AnyObject } from "../common/Helper"

/**
 * Props for a generic button component.
 *
 * @interface ButtonProps
 * @extends React.HTMLProps<HTMLButtonElement>
 * @property {string} buttonTitle - The text to display on the button.
 * @property {"submit" | "button" | "reset"} [type] - The button type.
 * @property {boolean} [isSubmitting] - If true, shows a loading spinner or disables the button.
 * @property {string} [customClassName] - Custom CSS class for the button.
 * @property {Pick<SpinnerProps, "size" | "variant" | "animation">} [spinnerProps] - Spinner configuration when loading.
 * @property {string} [buttonContentClass] - Custom class for the button's content.
 */
export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    buttonTitle: string
    type?: "submit" | "button" | "reset"
    isSubmitting?: boolean
    customClassName?: string
    spinnerProps?: Pick<SpinnerProps, "size" | "variant" | "animation">
    buttonContentClass?: string
}

/**
 * Props for a button that sends an OTP (One-Time Password).
 *
 * @interface SendOTPProps
 * @extends Omit<ButtonProps, "buttonTitle">
 * @property {string} [buttonTitle] - The text to display on the button.
 * @property {AnyObject} payload - The payload to send with the OTP request.
 * @property {ZodSchema<Any>} [schema] - Optional Zod schema for validating the payload.
 * @property {string} endpoint - The API endpoint to send the OTP request to.
 */
export interface SendOTPProps extends Omit<ButtonProps, "buttonTitle"> {
    buttonTitle?: string
    payload: AnyObject
    schema?: ZodSchema<Any>
    endpoint: string
}

/**
 * Props for a bulk upload button component.
 *
 * @interface BulkUploadButtonProps
 * @extends React.HTMLProps<HTMLButtonElement>
 * @property {ModuleTypeEnum} moduleType - The module type for which the bulk upload is performed.
 * @property {string} [modalTitle] - Optional title for the upload modal.
 * @property {string} [buttonTitle] - Optional text for the upload button.
 * @property {(asset?: Any) => void} [onAdded] - Callback invoked after files are successfully added.
 * @property {() => void} [handleDownloadSampleLink] - Handler for downloading a sample file.
 * @property {boolean} [isSubmitDisabled] - If true, disables the submit button in the modal.
 */
export interface BulkUploadButtonProps extends React.HTMLProps<HTMLButtonElement> {
    moduleType: ModuleTypeEnum
    modalTitle?: string
    buttonTitle?: string
    onAdded?: (asset?: Any) => void
    handleDownloadSampleLink?: () => void
    isSubmitDisabled?: boolean
}

/**
 * Props for a bulk download button component.
 *
 * @interface BulkDownloadButtonProps
 * @extends React.HTMLProps<HTMLButtonElement>
 * @property {string} moduleType - The module type for which the bulk download is performed.
 * @property {string} [buttonTitle] - Optional text for the download button.
 * @property {boolean} [isSubmitDisabled] - If true, disables the download button.
 */
export interface BulkDownloadButtonProps extends React.HTMLProps<HTMLButtonElement> {
    moduleType: string
    buttonTitle?: string
    isSubmitDisabled?: boolean
}
