import { Any } from "@/types/common/helper"
import { z } from "zod"
import { CHAR_DEFAULT_MAX_LENGTH, CONFIG } from "./constants"
import { validateMaxIntValue, validateURLValue } from "./helpers"
import { generateErrorMessage } from "./message-generator"

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
export const validateOrderFieldNumericValue = (value: any) => {
    if (value && value?.trim().length > 0) {
        return value?.match(/^\d+$/)
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
export const validateURLValueWithoutProtocol = (value: any) => {
    if (value && value.trim().length > 0) {
        return value?.match(/^(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}(\/[^\s]*)?$/)
    }
    return true
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

export function getArrayorNullTransformedSchema() {
    return z
        .array(z.string())
        .optional()
        .nullable()
        .transform((arg) => (arg ? getArrayOrNull(arg) : null))
}

export function getLogNoFieldSchema(fieldName: string) {
    return z
        .string()
        .trim()
        .max(CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255, {
            message: generateErrorMessage(
                fieldName,
                CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255,
                true,
            ),
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
        .max(CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255, {
            message: generateErrorMessage(
                field_name,
                CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255,
                true,
            ),
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
        .max(CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255, {
            message: generateErrorMessage(
                field_name,
                CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255,
                true,
            ),
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
        .max(CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255, {
            message: generateErrorMessage(
                "Email",
                CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255,
                true,
            ),
        })
        .toLowerCase()
        .email()
        .regex(/^[^,]+@[^,]+$/, { message: "Email must not contain a comma before the @ sign" })
}

export function getURLWithoutProtocolSchema(fieldName: string) {
    return z
        .string()
        .trim()
        .max(CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255, {
            message: generateErrorMessage(
                fieldName,
                CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255,
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
    maxChars = CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255,
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

/**
 * Generates a Zod string schema for validating a name field.
 *
 * The validation ensures the string is trimmed, has a minimum and maximum length,
 * and ensures the string starts with at least one letter, followed by any combination of letters, spaces, or apostrophes, and matches the entire string.
 *
 * @param {string} fieldName - The name of the field to be shown in the error message.
 * @returns {z.ZodString} The Zod schema for the name field.
 */
export function getNameFieldSchema(fieldName: string, maxLength = CHAR_DEFAULT_MAX_LENGTH) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })
        .max(maxLength, {
            message: generateErrorMessage(fieldName, maxLength, true),
        })
}

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
        .min(CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_6, {
            message: generateErrorMessage("Password", CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_6),
        })
        .refine((field) => field.match(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/), {
            message: "Must contain a combination of letters and numbers",
        })

export function getAlphaNumericFieldSchema(fieldName: string, maxLength = CHAR_DEFAULT_MAX_LENGTH) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })
        .max(maxLength, {
            message: generateErrorMessage(fieldName, maxLength, true),
        })
}

export function requiredSingleDropdownSchema(fieldName: string, message?: string) {
    return z
        .object(
            {
                label: z.string(),
                value: z.string().or(z.number()),
                data: z.any(),
            },
            {
                invalid_type_error: message ? message : generateErrorMessage(fieldName),
                required_error: message ? message : generateErrorMessage(fieldName),
            },
        )
        .required()
        .transform((value) => getValueOrNull(value))
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
    return /^[-]?\d+(\.\d+)?$/.test(value)
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
        .transform((value) => typeof value !== "undefined" && value?.toString())
        .refine((value) => (value?.trim()?.length ? true : false), {
            message: `${fieldName} is required`,
        })
        .refine((value) => validateDecimalValue(value), {
            message: CONFIG.VALIDATIONS.MESSAGE.NUMERICAL_VALUES_REQUIRED,
        })
        .transform((value) => (value ? parseFloat(value) : null))
}

export function getOptionalDecimalFieldSchema() {
    return z
        .string()
        .optional()
        .nullable()
        .refine((value) => validateOptionalDecimalValue(value), {
            message: CONFIG.VALIDATIONS.MESSAGE.NUMERICAL_VALUES_REQUIRED,
        })
        .transform((value) => (value ? parseFloat(value).toString() : null))
}

export function getValueorNullSchema() {
    return z
        .string()
        .trim()
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
}

export function getOptionalNumberFieldSchema() {
    return z
        .string()
        .trim()
        .optional()
        .nullable()
        .refine((value) => validateMaxIntValue(value), {
            message: CONFIG.VALIDATIONS.MESSAGE.MAX_INT_LIMIT,
        })
        .transform((value) => getValueOrNull(value))
}
export function getRequiredNumberFieldSchema(fieldName: string) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .min(CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_1, {
            message: generateErrorMessage(fieldName),
        })
        .refine((value) => validateMaxIntValue(value), {
            message: CONFIG.VALIDATIONS.MESSAGE.MAX_INT_LIMIT,
        })
        .transform((value) => getValueOrNull(value))
}

export const requiredImageSchema = ({
    message = "An image is required.",
}: {
    message?: string
}) => {
    return z.any().refine(
        (file) => {
            if (file instanceof File) {
                return true
            } else {
                return !(file === null || file === undefined || file?.trim() === "")
            }
        },
        { message },
    )
}

/**
 * Generates a Zod string schema for validating a name field.
 *
 * The validation ensures the string is trimmed, has a minimum and maximum length,
 * and ensures the string starts with at least one letter, followed by any combination of letters, spaces, or apostrophes, and matches the entire string.
 *
 * @param {string} fieldName - The name of the field to be shown in the error message.
 * @returns {z.ZodString} The Zod schema for the name field.
 */
export const getNameFieldValidationSchema = (
    fieldName: string,
    maxLength = CHAR_DEFAULT_MAX_LENGTH,
) =>
    z
        .string()
        .trim()
        .min(CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_1, {
            message: generateErrorMessage(fieldName),
        })
        .max(maxLength, {
            message: generateErrorMessage(fieldName, maxLength, true),
        })
        .refine((value) => value.match(/^[a-zA-Z]+[a-zA-Z\s']*$/), {
            message: `Invalid ${fieldName}`,
        })

export const validateOptionalDecimalValue = (value: Any): boolean => {
    // Trim whitespace and check if the value is non-empty
    if (!value || value?.trim().length === 0) {
        return true
    }
    console.log("🚀 ~ validateOptionalDecimalValue ~ value:", value)

    // Match numbers, allowing optional decimal points and leading/trailing zeros
    return /^[-]?\d+(\.\d+)?$/.test(value)
}

/**
 * Generates a Zod schema for a required multi-select field.
 *
 * This schema validates an array of objects, where each object represents an option
 * with a `label`, `value`, and optional `data` field. The schema checks that:
 * - Each object has a valid `value`.
 * - The array contains at least one object (required field).
 *
 * The schema also transforms the input by mapping each object in the array to its
 * `value` or `null`, returning an empty array if the input is invalid or empty.
 *
 * @param {string} fieldName - The name of the field being validated, used in error messages.
 * @returns {z.ZodType} A Zod schema for validating and transforming the multi-select field.
 *
 * @example
 * const schema = getRequiredMultiSelectFieldSchema("Options");
 *
 * // Valid input
 * schema.parse([{ label: "Option 1", value: "opt1", data: {} }]);
 * // Output: ["opt1"]
 *
 * // Invalid input (empty array)
 * schema.parse([]);
 * // Throws error: "Options is required"
 *
 * // Invalid input (empty value in an object)
 * schema.parse([{ label: "Option 1", value: "", data: {} }]);
 * // Throws error: "Options is required"
 */
export const getRequiredMultiSelectFieldSchema = (fieldName: string) => {
    return z
        .array(
            z
                .object(
                    {
                        label: z.string(),
                        value: z.string(),
                        data: z.any(),
                    },
                    {
                        invalid_type_error: `${fieldName} is required`,
                        required_error: `${fieldName} is required`,
                    },
                )
                .refine((option) => !!option?.value, { message: `${fieldName} is required` })
                .or(
                    z
                        .string({
                            invalid_type_error: `${fieldName} is required`,
                            required_error: `${fieldName} is required`,
                        })
                        .trim(),
                ),
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

/**
 * Generates a Zod schema for validating a name field with additional constraints.
 *
 * This function extends the base `getNameFieldSchema` to ensure that the input contains
 * only alphabetic characters (a-z, A-Z) in addition to the original validations.
 *
 * @param {string} fieldName - The name of the field being validated. This will be used
 *                             to generate appropriate error messages.
 * @param {number} [maxLength=CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS] -
 *                             The maximum allowed length for the field. Defaults to 255 characters.
 * @returns {ZodString} - A Zod schema object for the name field with alphabet-only validation.
 */
export const getNameFieldSchemaWithOnlyAlphabets = (
    fieldName: string,
    maxLength = CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255,
) => {
    return getNameFieldSchema(fieldName, maxLength).regex(/^[a-zA-Z ]+$/, {
        message: "Only alphabets are allowed",
    })
}

export function getRequiredEmailSchema() {
    return z
        .string()
        .trim()
        .min(1, { message: CONFIG.VALIDATIONS.MESSAGE.EMAIL_REQUIRED })
        .max(CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255, {
            message: generateErrorMessage(
                CONFIG.VALIDATIONS.FIELD_NAME.EMAIL,
                CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255,
                true,
            ),
        })
        .toLowerCase()
        .email("Enter a valid email address")
        .regex(/^[^,]+@[^,]+$/, { message: "Email must not contain a comma before the @ sign" })
}

export const getOptionalEmailSchema = () =>
    z
        .string()
        .trim()
        .max(CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255, {
            message: generateErrorMessage(
                CONFIG.VALIDATIONS.FIELD_NAME.EMAIL,
                CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255,
                true,
            ),
        })
        .toLowerCase()
        .email("Enter a valid email address")
        .regex(/^[^,]+@[^,]+$/, { message: "Email must not contain a comma before the @ sign" })

export function getPhoneNumberSchema(minLength: number) {
    return z
        .string({
            required_error: "Contact number is required",
            invalid_type_error: "Contact number is required",
        })
        .trim()
        .min(minLength, { message: "Contact number is required" })
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

export function getOptionalAlphaNumericFieldSchema(
    fieldName: string,
    maxLength = CHAR_DEFAULT_MAX_LENGTH,
) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
        })
        .trim()
        .max(maxLength, {
            message: generateErrorMessage(fieldName, maxLength, true),
        })
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
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

/**
 * Generates a Zod schema for an optional multi-select field.
 *
 * This schema validates an array of objects, where each object represents an option
 * with a `label`, `value`, and optional `data` field. The schema checks that each object
 * has a valid `value`. If the array is provided, it ensures that all elements are valid.
 * If no array is provided, the field is considered optional and defaults to `null`.
 *
 * The schema also transforms the input by mapping each object in the array to its
 * `value` or `null`, returning an empty array if the input is invalid or empty.
 *
 * @param {string} fieldName - The name of the field being validated, used in error messages.
 * @returns {z.ZodType} A Zod schema for validating and transforming the multi-select field.
 *
 * @example
 * const schema = getOptionalMultiSelectFieldSchema("Options");
 *
 * // Valid input
 * schema.parse([{ label: "Option 1", value: "opt1", data: {} }]);
 * // Output: ["opt1"]
 *
 * // Invalid input (empty value)
 * schema.parse([{ label: "Option 1", value: "", data: {} }]);
 * // Throws error: "Options is required"
 *
 * // Optional input
 * schema.parse(null);
 * // Output: []
 */
export const getOptionalMultiSelectFieldSchema = (fieldName: string) => {
    return z
        .array(
            z
                .object(
                    {
                        label: z.string(),
                        value: z.string(),
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

export function getURLSchema(fieldName: string) {
    return z
        .string()
        .trim()
        .max(CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255, {
            message: generateErrorMessage(
                fieldName,
                CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255,
                true,
            ),
        })
        .optional()
        .nullable()
        .refine((value) => validateURLValue(value), {
            message: CONFIG.VALIDATIONS.MESSAGE.INVALID_URL,
        })
        .transform((value) => getValueOrNull(value))
}

export function getUserPasswordSchema(maxLength = CHAR_DEFAULT_MAX_LENGTH) {
    return z
        .string()
        .trim()
        .min(
            CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_6,
            generateErrorMessage(
                CONFIG.VALIDATIONS.FIELD_NAME.PASSWORD,
                CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_6,
                false,
            ),
        )
        .max(maxLength, {
            message: generateErrorMessage(CONFIG.VALIDATIONS.FIELD_NAME.PASSWORD, maxLength, true),
        })
}

/**
 * Validates whether the given value is a positive decimal number.
 *
 * This function checks if the input is a non-empty string, optionally containing
 * decimal points, leading, or trailing zeros. It ensures that the value represents
 * a valid positive decimal number.
 *
 * @param {any} value - The input value to validate.
 * @returns {boolean} - Returns `true` if the value is a valid positive decimal number, otherwise `false`.
 *
 * @example
 * validatePositiveDecimalValue("123"); // true
 * validatePositiveDecimalValue("123.45"); // true
 * validatePositiveDecimalValue("0.01"); // true
 * validatePositiveDecimalValue("0"); // true
 * validatePositiveDecimalValue("-123"); // false
 * validatePositiveDecimalValue("abc"); // false
 * validatePositiveDecimalValue(""); // false
 * validatePositiveDecimalValue("   "); // false
 */
export const validatePositiveDecimalValue = (value: Any): boolean => {
    // Trim whitespace and check if the value is non-empty
    if (!value || value.trim().length === 0) {
        return false // Reject empty values
    }

    // Match numbers, allowing optional decimal points and leading/trailing zeros
    return /^\d+(\.\d+)?$/.test(value)
}
/**
 * Validates whether the given value is either empty or a positive decimal number.
 *
 * This function allows empty values (treated as valid) and checks if non-empty values
 * represent a valid positive decimal number. It trims whitespace before validation.
 *
 * @param {any} value - The input value to validate.
 * @returns {boolean} - Returns `true` if the value is empty or a valid positive decimal number, otherwise `false`.
 *
 * @example
 * validateOptionalPositiveDecimalValue(""); // true (empty values are valid)
 * validateOptionalPositiveDecimalValue("   "); // true (empty after trimming is valid)
 * validateOptionalPositiveDecimalValue("123.45"); // true
 * validateOptionalPositiveDecimalValue("0.01"); // true
 * validateOptionalPositiveDecimalValue("-123"); // false
 * validateOptionalPositiveDecimalValue("abc"); // false
 */
export const validateOptionalPositveDecimalValue = (value: Any): boolean => {
    // Trim whitespace and check if the value is non-empty
    if (!value || value?.trim().length === 0) {
        return true
    }

    // Match numbers, allowing optional decimal points and leading/trailing zeros
    return /^\d+(\.\d+)?$/.test(value)
}

/**
 * Creates a schema for validating a required positive decimal field.
 *
 * This schema ensures that:
 * - The value is defined and non-empty.
 * - The value represents a valid positive decimal number.
 *
 * It uses the `validatePositiveDecimalValue` function for validation and provides custom
 * error messages if the value is missing or invalid. Additionally, it transforms valid
 * values into a `number` (parsed as `parseFloat`).
 *
 * @param {string} fieldName - The name of the field, used in the error message if the field is missing.
 * @returns {z.ZodSchema} - A Zod schema for validating a required positive decimal field.
 *
 * @example
 * const schema = getRequiredPositiveDecimalFieldSchema("Amount");
 * schema.parse("123.45"); // 123.45 (number)
 * schema.parse(""); // Throws validation error: "Amount is required"
 * schema.parse("-123"); // Throws validation error with the message defined in CONFIG.VALIDATIONS.MESSAGE.POSITIVE_NUMERICAL_VALUES_REQUIRED
 */
export function getRequiredPositiveDecimalFieldSchema(fieldName: string) {
    return z
        .any()
        .transform((value) => typeof value !== "undefined" && value?.toString())
        .refine((value) => (value?.trim()?.length ? true : false), {
            message: `${fieldName} is required`,
        })
        .refine((value) => validatePositiveDecimalValue(value), {
            message: CONFIG.VALIDATIONS.MESSAGE.POSITIVE_NUMERICAL_VALUES_REQUIRED,
        })
        .transform((value) => (value ? parseFloat(value) : null))
}

/**
 * Creates a schema for validating an optional positive decimal field.
 *
 * This schema ensures that the input is either:
 * - `null`
 * - An optional string representing a positive decimal number.
 *
 * It uses the `validateOptionalPositiveDecimalValue` function for custom validation
 * and provides a specific error message if the validation fails. Additionally,
 * it transforms valid values into a `number` (parsed as `parseFloat`) or returns `null` if empty.
 *
 * @returns {z.ZodSchema} - A Zod schema for validating an optional positive decimal field.
 *
 * @example
 * const schema = getOptionalPositiveDecimalFieldSchema();
 * schema.parse("123.45"); // 123.45 (number)
 * schema.parse(null); // null
 * schema.parse(""); // null
 * schema.parse("-123"); // Throws validation error with the message defined in CONFIG.VALIDATIONS.MESSAGE.POSITIVE_NUMERICAL_VALUES_REQUIRED
 */
export function getOptionalPositiveDecimalFieldSchema() {
    return z
        .string()
        .optional()
        .nullable()
        .refine((value) => validateOptionalPositveDecimalValue(value), {
            message: CONFIG.VALIDATIONS.MESSAGE.POSITIVE_NUMERICAL_VALUES_REQUIRED,
        })
        .transform((value) => (value ? parseFloat(value) : null))
}

export const getValueInNumericForm = (value: string | null) => (value ? parseFloat(value) : null)

export const validGSTNumberSchema = (
    fieldName: string = "GST number",
    maxLength = CHAR_DEFAULT_MAX_LENGTH,
) =>
    z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })
        .max(maxLength, {
            message: generateErrorMessage(fieldName, maxLength, true),
        })
        .regex(/^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/, {
            message: `Invalid ${fieldName} format.`,
        })

export const addressSchema = () =>
    z.object({
        address_type: getValueorNullTransformedSchema(),
        address: getOptionalAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.ADDRESS),
        pincode: getOptionalAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.PINCODE),
        city: getOptionalAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.PINCODE),
        state: getOptionalAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.PINCODE),
        country: getOptionalAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.PINCODE),
    })

export const addressSchemaArray = () => z.array(addressSchema())
