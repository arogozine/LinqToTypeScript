import { ErrorString, InvalidOperationException } from "../../shared"

/**
 * Computes the average of a sequence of values
 * that are obtained by invoking an async transform function on each element of the input sequence.
 * @param source A sequence of values to calculate the average of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The average value (from the selector) of the specified async sequence
 */
export const averageAsync = async <TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> => {
    let value = 0
    let count = 0
    for await (const item of source) {
        value = value + await selector(item)
        count = count + 1
    }

    if (count === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / count
}
