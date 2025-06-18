import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * The label for the input field.
     * @type {string}
     */
    label: string

    /**
     * The error message to display, if any.
     * @type {any}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorMsg?: any

    /**
     * Additional CSS classes to apply to the input field.
     * @type {string}
     */
    className?: string

    /**
     * Additional CSS classes to apply to the label.
     * @type {string}
     */
    labelClass?: string
    /**
     * Additional CSS classes to apply to the input container.
     * @type {string}
     */
    inputContainerClass?: string
    /**
     * Additional text to display after the input field.
     * @type {string}
     */
    postInputText?: string
    /**
     * Additional text to display before the input field.
     * @type {string}
     */
    preInputText?: string
    /**
     * to show asterisk mark if field is required
     */
    isRequired?: boolean
    /**
     * show label as Title Case
     */
    isTitleCaseRequired?: boolean
}

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /**
     * The label for the textarea field.
     */
    label: string

    /**
     * Optional error message to display.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorMsg?: any

    /**
     * Optional class name for additional styling.
     */
    className?: string

    /**
     * Optional maximum number of characters allowed, this will be used below textarea to show character counter.
     */
    maxChars?: number

    /**
     * Optional current number of characters.
     */
    currentChars?: number

    /**
     * Optional class name for additional styling on label.
     */
    labelClass?: string
    isRequired?: boolean
}
