import { z } from "zod"
import { config } from "./constants"
import { generateErrorMessage } from "./message-generator"

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
        .min(config.VALIDATIONS.CHARS_3, {
            message: generateErrorMessage(fieldName, config.VALIDATIONS.CHARS_3),
        })
        .max(config.VALIDATIONS.CHARS_255, {
            message: generateErrorMessage(fieldName, config.VALIDATIONS.CHARS_255, true),
        })
        .refine((value) => value.match(/^[a-zA-Z]+[a-zA-Z\s']*$/), {
            message: `Invalid ${fieldName}`,
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
        .min(config.VALIDATIONS.CHARS_6, {
            message: generateErrorMessage("Password", config.VALIDATIONS.CHARS_6),
        })
        .refine((field) => field.match(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/), {
            message: "Must contain a combination of letters and numbers",
        })
