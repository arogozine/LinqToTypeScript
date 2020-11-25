/**
 * Computes the sum of the sequence of numeric values that are obtained by invoking a transform function
 * on each element of the input async sequence.
 * @param source A sequence of values that are used to calculate a sum.
 * @param selector A transform function to apply to each element.
 * @returns The sum of values (from the selector) of the async sequence
 */
export const sumAsync = async <TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> => {
    let sum = 0
    for await (const value of source) {
        sum += await selector(value)
    }

    return sum
}
