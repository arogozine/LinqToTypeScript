/**
 * Does strict (===) comparison between two values.
 * @param x left value
 * @param y right value
 * @returns Whether or not the two values are strictly equal
 */
export const StrictEqualityComparer = <T>(x: T, y: T) =>
    x === y
