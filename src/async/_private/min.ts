import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * Returns the minimum value in a sequence of values.
 * @param source A sequence of values to determine the minimum value of.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
export function min(source: AsyncIterable<number>): Promise<number>
/**
 * Invokes a transform function on each element of a sequence and returns the minimum value.
 * @param source A sequence of values to determine the minimum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
export function min<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
export function min(source: AsyncIterable<number>, selector?: (x: number) => number): Promise<number> {
    if (selector) {
        return min_2(source, selector)
    } else {
        return min_1(source)
    }
}

async function min_1(source: AsyncIterable<number>): Promise<number> {
    let minValue: number | null = null
    for await (const item of source) {
        minValue = Math.min(minValue || Number.POSITIVE_INFINITY, item)
    }

    if (minValue === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return minValue
    }
}

async function min_2(source: AsyncIterable<number>, selector: (x: number) => number): Promise<number> {
    let minValue: number | null = null
    for await (const item of source) {
        minValue = Math.min(minValue || Number.POSITIVE_INFINITY, selector(item))
    }

    if (minValue === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return minValue
    }
}
