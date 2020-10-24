/**
 * Does weak (==) comparison between two values.
 * Good for comparing numbers and strings.
 * @param x left value
 * @param y right value
 * @returns x == y
 */
export const EqualityComparer = <T>(x: T, y: T) =>
    // eslint-disable-next-line eqeqeq
    x == y
