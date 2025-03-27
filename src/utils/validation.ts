import { z } from "zod"
import { generateErrorMessage } from "./message-generator"
import { CONFIG } from "./constants"
import { Any } from "@/types/common/helper"

export const validateRatingFieldFormat = (value: string | null) => {
    if (value && value.trim().length > 0) {
        return value.match(/^(?:999(?:\.0{1,2})?|\d{1,3}(?:\.\d{1,2})?)$/)
    }
    return true
}

export const validateIMDBFieldFormat = (value: string | null) => {
    if (value && value.trim().length > 0) {
        return value.match(/^(?:10(?:\.0{1,2})?|0?[0-9](?:\.\d{1,2})?)$/)
    }
    return true
}

export const validateRottenTomatoesFieldFormat = (value: string | null) => {
    if (value && value.trim().length > 0) {
        return value.match(
            /^(?:(?:100(?:\.00?)?)|(?:(?:0?[0-9]{1,2})(?:\.00?)?)|(?:\d{1,2}(?:\.\d{1,2})?))$/,
        )
    }
    return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateDurationFieldNumericValue = (value: any) => {
    if (value && value.trim().length > 0) {
        return value?.match(/^\d+$/)
    }
    if (parseInt(value) > CONFIG.VALIDATIONS.MAX_INT_LIMIT) {
        return false
    }
    return true
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateOrderFieldNumericValue = (value: any) => {
    if (value && value?.trim().length > 0) {
        return value?.match(/^\d+$/)
    }
    return true
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateOrderFieldMaxValue = (value: any) => {
    if (value && value?.trim().length > 0) {
        if (parseInt(value) > CONFIG.VALIDATIONS.MAX_ORDER_LIMIT) {
            return false
        }
        return true
    }
    return true
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateDurationFieldValidRange = (value: any) => {
    if (value && value.trim().length > 0) {
        const numericalValue = parseInt(value)
        if (numericalValue > CONFIG.VALIDATIONS.MAX_INT_LIMIT || numericalValue < 0) {
            return false
        }
    }
    return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateNumericValue = (value: any) => {
    if (value && value.trim().length > 0) {
        return value?.match(/^\d+$/)
    }
    return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateURLValue = (value: any) => {
    if (value && value.trim().length > 0) {
        return value?.match(
            /^(https?|ftps?):\/\/(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}(\/[^\s]*)?$/,
        )
    }
    return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateURLValueWithoutProtocol = (value: any) => {
    if (value && value.trim().length > 0) {
        return value?.match(/^(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}(\/[^\s]*)?$/)
    }
    return true
}

/**
 * Validates whether a given value is a valid numeric value, allowing both integers and decimal numbers.
 *
 * - The function checks if the value is a non-empty string and verifies if it is a valid number using a regular expression.
 * - The regex pattern allows numbers with optional decimal points and handles leading zeros.
 *
 * @param {any} value - The value to be validated, typically a string.
 * @returns {boolean} Returns true if the value is a valid number (integer or decimal); otherwise, false.
 *
 * @example
 * validateNumericValue("123"); // true
 * validateNumericValue("123.456"); // true
 * validateNumericValue("0.456"); // true
 * validateNumericValue("-123.456"); // true
 * validateNumericValue("+123"); // true
 * validateNumericValue("123."); // false
 * validateNumericValue("abc"); // false
 * validateNumericValue(""); // false
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateDecimalValue = (value: any): boolean => {
    // Trim whitespace and check if the value is non-empty
    if (!value || value.trim().length === 0) {
        return false // Reject empty values
    }

    // Match numbers, allowing optional decimal points and leading/trailing zeros
    return /^[+-]?\d+(\.\d+)?$/.test(value)
}

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
export function getValueOrNull(value: Any) {
    if (value === null || value === undefined) {
        return null
    }

    if (typeof value === "object") {
        return value.value ? value.value : null
    }

    if (value === 0) {
        return value.toString()
    }

    return value ? value : null
}
export function getArrayOrNull<T>(value: T[] | null) {
    if (value === null || value === undefined) {
        return null
    }
    return value.length === 0 ? null : value
}

/**
 * Creates a Zod schema that validates and transforms input data.
 *
 * The schema can handle both object and string inputs. The object schema expects
 * properties: `label`, `value`, and `data`. Both object and string inputs are transformed
 * using the `getValueOrNull` function.
 *
 * The `getValueOrNull` function performs the following transformations:
 * - If the input is `null` or `undefined`, it returns `null`.
 * - If the input is an object with a `value` property, it returns the `value` property.
 * - If the input is `0`, it returns `"0"` (as a string).
 * - Otherwise, it returns the input value if it's truthy; otherwise, it returns `null`.
 *
 * @returns {z.ZodUnion<[z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodObject<{
 * label: z.ZodString;
 * value: z.ZodString;
 * data: z.ZodTypeAny;
 * }>>>>, z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>>>>}
 *   A Zod schema that validates and transforms input data.
 *
 * @example
 * const schema = getValueorNullTransformedSchema();
 * schema.parse({ label: "example", value: "123", data: {} }); // Returns "123"
 * schema.parse("example"); // Returns "example"
 * schema.parse(null); // Returns null
 */
export function getValueorNullTransformedSchema() {
    return z
        .object({
            label: z.string(),
            value: z.string(),
            data: z.any(),
        })
        .or(z.string().trim())
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
}

export function requiredSingleDropdownSchema(fieldName: string) {
    return z
        .object(
            {
                label: z.string(),
                value: z.string(),
                data: z.any(),
            },
            {
                invalid_type_error: generateErrorMessage(fieldName),
                required_error: generateErrorMessage(fieldName),
            },
        )
        .required()
        .transform((value) => getValueOrNull(value))
}

export function getArrayorNullTransformedSchema() {
    return z
        .array(z.string())
        .optional()
        .nullable()
        .transform((arg) => (arg ? getArrayOrNull(arg) : null))
}

export function getNameFieldSchema(fieldName: string, maxChars = CONFIG.VALIDATIONS.CHARS_255) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })
        .max(maxChars, {
            message: generateErrorMessage(fieldName, maxChars, true),
        })
}

export function getLogNoFieldSchema(fieldName: string) {
    return z
        .string()
        .trim()
        .max(CONFIG.VALIDATIONS.CHARS_255, {
            message: generateErrorMessage(fieldName, CONFIG.VALIDATIONS.CHARS_255, true),
        })
        .optional()
        .nullable()
        .refine((value) => validateNumericValue(value), {
            message: "Only numerical value is required",
        })
        .transform((value) => getValueOrNull(value))
}

export function getValueorNullSchemaMaxLength(fieldName: string, maxLength: number) {
    return z
        .string()
        .trim()
        .max(maxLength, { message: generateErrorMessage(fieldName, maxLength, true) })
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
}

export function getValueOrEmptyStringSchemaMaxLength(fieldName: string, maxLength: number) {
    return z
        .string()
        .trim()
        .max(maxLength, { message: generateErrorMessage(fieldName, maxLength, true) })
        .optional()
        .nullable()
}

export function getValueorNullSchema() {
    return z
        .string()
        .trim()
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
}
export function getValueorNullSchemaMinMaxLength(fieldName: string, maxLength: number) {
    return z
        .string()
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })
        .max(maxLength, { message: generateErrorMessage(fieldName, maxLength, true) })
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
}

export function getUserNameSchema(message: string, field_name: string) {
    return z
        .string()
        .trim()
        .min(1, { message: generateErrorMessage(field_name) })
        .max(CONFIG.VALIDATIONS.CHARS_255, {
            message: generateErrorMessage(field_name, CONFIG.VALIDATIONS.CHARS_255, true),
        })
        .refine((field) => nameFieldFormat(field), {
            message,
        })
}

export function getUsersUserNameSchema(message: string, field_name: string) {
    return z
        .string()
        .trim()
        .min(3, { message: generateErrorMessage(field_name, 3) }) // Minimum length for a username
        .max(CONFIG.VALIDATIONS.CHARS_255, {
            message: generateErrorMessage(field_name, CONFIG.VALIDATIONS.CHARS_255, true),
        })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: "Username can only contain letters, numbers, and underscores.",
        }) // Only allows alphanumeric and underscore
        .refine((field) => nameFieldFormat(field), {
            message, // Custom validation logic if necessary
        })
}

export function getUserEmailSchema() {
    return z
        .string()
        .trim()
        .min(1, { message: "Email is required" })
        .max(CONFIG.VALIDATIONS.CHARS_255, {
            message: generateErrorMessage("Email", CONFIG.VALIDATIONS.CHARS_255, true),
        })
        .toLowerCase()
        .email()
        .regex(/^[^,]+@[^,]+$/, { message: "Email must not contain a comma before the @ sign" })
}

export function getUserPasswordSchema(fieldName?: string) {
    return z
        .string()
        .trim()
        .min(
            CONFIG.VALIDATIONS.CHARS_8,
            generateErrorMessage(fieldName ?? "Password", CONFIG.VALIDATIONS.CHARS_8, false),
        )
        .max(CONFIG.VALIDATIONS.CHARS_255, {
            message: generateErrorMessage(
                fieldName ?? "Password",
                CONFIG.VALIDATIONS.CHARS_255,
                true,
            ),
        })
        .refine((field) => passwordFieldFormat(field), {
            message:
                "Must contain a combination of letters, numbers and special character with one uppercase and lowercase character",
        })
}

export function getURLSchema(fieldName: string) {
    return z
        .string()
        .trim()
        .max(CONFIG.VALIDATIONS.TWO_HUNDREAD_CHARACTERS, {
            message: generateErrorMessage(
                fieldName,
                CONFIG.VALIDATIONS.TWO_HUNDREAD_CHARACTERS,
                true,
            ),
        })
        .optional()
        .nullable()
        .refine((value) => validateURLValue(value), {
            message: "Invalid URL",
        })
        .transform((value) => getValueOrNull(value))
}

export function getURLWithoutProtocolSchema(fieldName: string) {
    return z
        .string()
        .trim()
        .max(CONFIG.VALIDATIONS.TWO_HUNDREAD_CHARACTERS, {
            message: generateErrorMessage(
                fieldName,
                CONFIG.VALIDATIONS.TWO_HUNDREAD_CHARACTERS,
                true,
            ),
        })
        .optional()
        .nullable()
        .refine((value) => validateURLValueWithoutProtocol(value), {
            message: "Invalid URL",
        })
        .transform((value) => getValueOrNull(value))
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

export function addressValidationSchema() {
    return z.any().refine(
        (data) => {
            if (typeof data === "string") {
                if (data?.trim().length === 0) {
                    return false
                } else {
                    return false
                }
            } else {
                if (typeof data === "object" && !Array.isArray(data)) {
                    return true
                }
                return false
            }
        },
        {
            message: "Address must be selected from dropdown",
        },
    )
}
export function getValueorNullTransformedFieldArraySchema() {
    return z
        .object({
            label: z.string(),
            value: z.string(),
            data: z.any(),
        })
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
}

/**
 * Generates a schema for a string field with minimum character length validation.
 *
 * @param {string} fieldName - The name of the field for which the schema is generated.
 * @returns {ZodSchema} A Zod schema for validating the field.
 */
export function getMinCharactersSchema(fieldName: string) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })
}

/**
 * Returns a Zod schema that validates an object with specific properties
 * or a trimmed string, transforming the input using the `getValueOrNull` function.
 *
 * The function creates a Zod schema that matches either:
 * 1. An object with the following properties:
 *    - `label` (string): A string representing the label.
 *    - `value` (string): A string representing the value.
 *    - `data` (any): An additional field that can hold any data type.
 * 2. A non-empty trimmed string.
 *
 * The transformation applies the `getValueOrNull` function to convert the
 * validated value into its desired form or null.
 *
 * @returns {z.ZodSchema} A Zod schema that validates and transforms the input value.
 */
export function getRequiredValueSchema(fieldName = "This field") {
    return z
        .object(
            {
                label: z.string({
                    invalid_type_error: `${fieldName} is required`,
                    required_error: `${fieldName} is required`,
                }),
                value: z.string({
                    invalid_type_error: `${fieldName} is required`,
                    required_error: `${fieldName} is required`,
                }),
                data: z.any({
                    invalid_type_error: `${fieldName} is required`,
                    required_error: `${fieldName} is required`,
                }),
            },
            {
                invalid_type_error: `${fieldName} is required`,
                required_error: `${fieldName} is required`,
            },
        )
        .or(
            z
                .string({
                    invalid_type_error: `${fieldName} is required`,
                    required_error: `${fieldName} is required`,
                })
                .trim(),
        )
        .transform((value) => getValueOrNull(value))
}

/**
 * Returns a Zod schema for validating a required number field with specific constraints.
 *
 * This schema ensures that the field is not empty, is a valid numerical value, and does not exceed
 * a specified maximum character length. The validation process includes several refinements and transformations.
 *
 * @param {string} fieldName - The name of the field being validated, used in error messages.
 * @returns {z.ZodEffects<z.ZodTypeAny, number | null, any>} A Zod schema with validations applied.
 *
 * @example
 * Usage example with Zod for a form validation:
 * const schema = z.object({
 *   age: getRequiredNumberFieldSchema('Age'),
 * });
 *
 * schema.parse({ age: '25' }); // Valid
 * schema.parse({ age: 'abc' }); // Invalid, throws an error
 */
export function getRequiredNumberFieldSchema(fieldName: string) {
    return z
        .any()
        .transform((value) => typeof value !== "undefined" && value && value.toString())
        .refine((value) => (value && value?.trim()?.length ? true : false), {
            message: `${fieldName} is required`,
        })
        .refine((value) => validateDurationFieldNumericValue(value), {
            message: "Only positive integers are allowed",
        })
        .refine((value) => validateOrderFieldMaxValue(value), {
            message: `${fieldName} 2147483647 is the maximum limit`,
        })
        .transform((value) => (value ? parseInt(value) : null))
}

/**
 * Returns a Zod schema for validating a required decimal number field with specific constraints.
 *
 * This schema ensures that the field is not empty, is a valid numerical value, and does not exceed
 * a specified maximum character length. The validation process includes several refinements and transformations.
 *
 * @param {string} fieldName - The name of the field being validated, used in error messages.
 * @returns {z.ZodEffects<z.ZodTypeAny, number | null, any>} A Zod schema with validations applied.
 *
 * @example
 * Usage example with Zod for a form validation:
 * const schema = z.object({
 *   age: getRequiredNumberFieldSchema('Age'),
 * });
 *
 * schema.parse({ age: '25' }); // Valid
 * schema.parse({ grace: '25.67' }); // Valid
 * schema.parse({ age: 'abc' }); // Invalid, throws an error
 */
export function getRequiredDecimalFieldSchema(fieldName: string) {
    return z
        .any()
        .transform((value) => typeof value !== "undefined" && value.toString())
        .refine((value) => (value?.trim()?.length ? true : false), {
            message: `${fieldName} is required`,
        })
        .refine((value) => validateDecimalValue(value), {
            message: "Only numerical value is required",
        })
        .transform((value) => (value ? parseFloat(value) : null))
}

export const getMultiSelectFieldSchema = () => {
    return z
        .array(
            z.object({
                label: z.any(),
                value: z.any(),
                data: z.any(),
            }),
        )
        .optional()
        .nullable()
        .transform((fields) => {
            if (Array.isArray(fields) && fields.length) {
                return fields.map((field) => getValueOrNull(field))
            } else {
                return []
            }
        })
}

export const getRequiredMultiSelectFieldSchema = (fieldName: string) => {
    return z
        .array(
            z
                .object(
                    {
                        label: z.any(),
                        value: z.any(),
                        data: z.any(),
                    },
                    {
                        invalid_type_error: `${fieldName} is required`,
                        required_error: `${fieldName} is required`,
                    },
                )
                .refine((option) => !!option?.value, { message: `${fieldName} is required` }),
            {
                invalid_type_error: `${fieldName} is required`,
                required_error: `${fieldName} is required`,
            },
        )
        .min(1, { message: `${fieldName} is required` })
        .transform((fields) => {
            if (Array.isArray(fields) && fields.length) {
                return fields.map((field) => getValueOrNull(field))
            } else {
                return []
            }
        })
}

export function getFloatingNumberFieldSchema() {
    return z
        .any()
        .transform((value) => value?.toString()?.trim())
        .refine((value) => (value?.trim()?.length ? validateDecimalValue(value) : true), {
            message: "Only numerical value is required",
        })
        .transform((value) => (value ? parseFloat(value) : null))
}

export function getRequiredFloatingNumberFieldSchema(fieldName: string) {
    return z
        .any()
        .transform((value) => typeof value !== "undefined" && value.toString())
        .refine((value) => !!value?.trim()?.length, { message: `${fieldName} is required` })
        .refine((value) => (value?.trim()?.length ? validateDecimalValue(value) : false), {
            message: "Only numerical value is required",
        })
        .transform((value) => (value ? parseFloat(value) : null))
}

export function getValueorNullSchemaWithoutTrim() {
    return z
        .string()
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
}

export function getValueOrNullWithMaxFieldSchema(
    fieldName: string,
    maxChars = CONFIG.VALIDATIONS.CHARS_255,
) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .optional()
        .nullable()
        .refine(
            (value) => {
                if (!value) {
                    return true
                }
                if (value && typeof value === "string" && value.length <= maxChars) {
                    return true
                }
            },
            { message: generateErrorMessage(fieldName, maxChars, true) },
        )
}

export function getAlphaNumericFieldSchema(fieldName: string) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })
        .max(CONFIG.VALIDATIONS.CHARS_255, {
            message: generateErrorMessage(fieldName, CONFIG.VALIDATIONS.CHARS_255, true),
        })
}

export function getOptionalAlphaNumericFieldSchema(fieldName: string) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
        })
        .trim()
        .max(CONFIG.VALIDATIONS.CHARS_255, {
            message: generateErrorMessage(fieldName, CONFIG.VALIDATIONS.CHARS_255, true),
        })
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
}
