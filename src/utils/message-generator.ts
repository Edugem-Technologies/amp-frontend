/**
 * Generates an error message based on field validation rules.
 *
 * The error message is customized based on whether the field's length is too short or too long,
 * or if a generic message is needed when no specific length condition is provided.
 *
 * @param {string} fieldName - The name of the field to generate the error message for.
 * @param {number} [characters] - The number of characters for the validation condition (optional).
 * @param {boolean} [maxCharsCrossed] - Flag indicating if the maximum character limit was crossed (optional).
 * @returns {string} The generated error message.
 */
export function generateErrorMessage(
    fieldName: string,
    characters?: number,
    maxCharsCrossed?: boolean,
) {
    if (characters && !maxCharsCrossed) {
        return `${fieldName} must be at least ${characters} characters long`
    } else if (maxCharsCrossed) {
        return `${fieldName} must be at most ${characters} characters long`
    }
    return `Please enter ${fieldName}`
}
