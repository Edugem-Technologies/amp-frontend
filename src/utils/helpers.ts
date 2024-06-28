/**
 * Generates an array of numbers from 1 to the specified length.
 *
 * @param {number} length - The length of the array to generate.
 * @returns {number[]} An array containing numbers from 1 up to the specified length.
 *
 * @example
 * Returns [1, 2, 3, 4, 5]
 * getArray(5);
 *
 * @example
 *  Returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * getArray(10);
 */
export const getArray = (length: number) => {
    return Array.from({ length }, (_, i) => i + 1)
}
