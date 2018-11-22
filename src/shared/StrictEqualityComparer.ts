/**
 * Does strict (===) comparison between two values.
 * @param x left value
 * @param y right value
 */
export function StrictEqualityComparer<T>(x: T, y: T): boolean {
    return x === y
}
