/**
 * Compares two values by converting them to json
 * and then comparing the two json strings.
 * @param x left value
 * @param y right value
 */
export const StringifyComparer = <T>(x: T, y: T) =>
    JSON.stringify(x) === JSON.stringify(y)
