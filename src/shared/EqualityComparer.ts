/**
 * Does weak (==) comparison between two values.
 * Good for comparing numbers and strings.
 * @param x left value
 * @param y right value
 */
export const EqualityComparer = <T>(x: T, y: T) =>
    // tslint:disable-next-line:triple-equals
    x == y
