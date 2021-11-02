import { ErrorString, InvalidOperationException } from "../../shared"

/**
 * Computes the average of a sequence of values
 * that are obtained by invoking a transform function on each element of the input sequence.
 * @param source A sequence of values to calculate the average of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns Avarage of the sequence of values
 */
export const averageAsync = async <TSource>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> => {
    let value = 0
    let count = 0
    for (const item of source) {
        value = value + await selector(item)
        count = count + 1
    }

    if (count === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / count
}
