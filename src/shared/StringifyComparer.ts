/**
 * Compares two values by converting them to json
 * and then comparing the two json strings.
 * @param x left value
 * @param y right value
 */
export function StringifyComparer<T>(x: T, y: T): boolean {
    return JSON.stringify(x) === JSON.stringify(y)
}
