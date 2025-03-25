import { z } from "zod"
import { generateErrorMessage } from "./message-generator"
import { CONFIG } from "./constants"
import { Any } from "@/types/common/helper"

/**
 * Generates a Zod string schema for validating a simple text field.
 *
 * The validation ensures the text field is trimmed and not empty.
 *
 * @param {string} fieldName - The name of the field to generate the validation schema for.
 * @returns {z.ZodString} The Zod schema for the simple text field.
 */
export const getSimpleTextFieldValidationSchema = (fieldName: string) =>
    z
        .string()
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })

/**
 * Generates a Zod string schema for validating a name field.
 *
 * The validation ensures the string is trimmed, has a minimum and maximum length,
 * and ensures the string starts with at least one letter, followed by any combination of letters, spaces, or apostrophes, and matches the entire string.
 *
 * @param {string} fieldName - The name of the field to be shown in the error message.
 * @returns {z.ZodString} The Zod schema for the name field.
 */
export const getNameFieldValidationSchema = (fieldName: string) =>
    z
        .string()
        .trim()
        .min(CONFIG.VALIDATIONS.CHARS_3, {
            message: generateErrorMessage(fieldName, CONFIG.VALIDATIONS.CHARS_3),
        })
        .max(CONFIG.VALIDATIONS.CHARS_255, {
            message: generateErrorMessage(fieldName, CONFIG.VALIDATIONS.CHARS_255, true),
        })

/**
 * Generates a Zod string schema for validating an email field.
 *
 * The validation ensures the string is not empty and it should be an email.
 *
 * @returns {z.ZodString} The Zod schema for the email field.
 */
export const getEmailFieldValidationSchema = () =>
    z
        .string({ required_error: generateErrorMessage("Email") })
        .min(1, { message: generateErrorMessage("Email") })
        .email()

/**
 * Generates a Zod string schema for validating a password field.
 *
 * The validation ensures the password is trimmed, has a minimum length, and contains
 * a combination of letters and numbers.
 *
 * @returns {z.ZodString} The Zod schema for the password field.
 */
export const getPasswordFieldValidationSchema = () =>
    z
        .string()
        .trim()
        .min(CONFIG.VALIDATIONS.CHARS_6, {
            message: generateErrorMessage("Password", CONFIG.VALIDATIONS.CHARS_6),
        })
        .refine((field) => field.match(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/), {
            message: "Must contain a combination of letters and numbers",
        })

export const nameFieldFormat = (value: Any) => {
    return value.match(/^[a-zA-Z' ]+$/)
}
export const passwordFieldFormat = (value: Any) => {
    return value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/)
}
export function getUserNameSchema(message: string, field_name: string) {
    return z
        .string()
        .trim()
        .min(1, { message: generateErrorMessage(field_name) })
        .max(CONFIG.VALIDATIONS.TWO_FIFTY_FIVE_CHARACTERS, {
            message: generateErrorMessage(
                field_name,
                CONFIG.VALIDATIONS.TWO_FIFTY_FIVE_CHARACTERS,
                true,
            ),
        })
        .refine((field) => nameFieldFormat(field), {
            message,
        })
}

export function getUserEmailSchema() {
    return z
        .string()
        .trim()
        .min(1, { message: "Email is required" })
        .max(CONFIG.VALIDATIONS.TWO_FIFTY_FIVE_CHARACTERS, {
            message: generateErrorMessage(
                "Email",
                CONFIG.VALIDATIONS.TWO_FIFTY_FIVE_CHARACTERS,
                true,
            ),
        })
        .toLowerCase()
        .email()
        .regex(/^[^,]+@[^,]+$/, { message: "Email must not contain a comma before the @ sign" })
}

export function getPhoneNumberSchema(minLength: number) {
    return z
        .string({
            required_error: "Phone number is required",
            invalid_type_error: "Phone number is required",
        })
        .trim()
        .min(minLength, { message: "Phone number is required" })
}

export function getUserPasswordSchema(fieldName?: string) {
    return z
        .string()
        .trim()
        .min(
            CONFIG.VALIDATIONS.EIGHT_CHARACTERS,
            generateErrorMessage(
                fieldName ?? "Password",
                CONFIG.VALIDATIONS.EIGHT_CHARACTERS,
                false,
            ),
        )
        .max(CONFIG.VALIDATIONS.TWO_FIFTY_FIVE_CHARACTERS, {
            message: generateErrorMessage(
                fieldName ?? "Password",
                CONFIG.VALIDATIONS.TWO_FIFTY_FIVE_CHARACTERS,
                true,
            ),
        })
        .refine((field) => passwordFieldFormat(field), {
            message:
                "Must contain a combination of letters, numbers and special character with one uppercase and lowercase character",
        })
}
