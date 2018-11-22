/**
 * Does weak (==) comparison between two values.
 * Good for comparing numbers and strings.
 * @param x left value
 * @param y right value
 */
export function EqualityComparer<T>(x: T, y: T): boolean {
    /* tslint:disable */
    return x == y
    /* tslint:enable */
}
