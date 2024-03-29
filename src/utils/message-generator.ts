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
