/**
 * Computes the sum of the sequence of numeric values that are obtained by invoking a transform function
 * on each element of the input sequence.
 * @param source A sequence of values that are used to calculate a sum.
 * @param selector A transform function to apply to each element.
 * @returns The sum of the projected values.
 */
export const sumAsync = async <TSource>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> => {
    let sum = 0
    for (const value of source) {
        sum += await selector(value)
    }

    return sum
}
