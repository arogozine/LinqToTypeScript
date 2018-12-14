import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * Invokes an async transform function on each element of a sequence and returns the maximum value.
 * @param source A sequence of values to determine the maximum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The maximum value in the sequence.
 */
export async function maxAsync<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
    let max: number | null = null
    for await (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, await selector(item))
    }

    if (max === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return max
    }
}
