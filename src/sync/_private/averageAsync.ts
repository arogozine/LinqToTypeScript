import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * Computes the average of a sequence of values
 * that are obtained by invoking a transform function on each element of the input sequence.
 * @param source A sequence of values to calculate the average of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns Avarage of the sequence of values
 */
export async function averageAsync<TSource>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
    let value: number | undefined
    let count: number | undefined
    for (const item of source) {
        value = (value || 0) + await selector(item)
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}
