/**
 * Does strict (===) comparison between two values.
 * @param x left value
 * @param y right value
 * @returns Whether or not the two values are strictly equal
 */
export const StrictEqualityComparer = <TSource>(x: TSource, y: TSource) =>
    x === y
