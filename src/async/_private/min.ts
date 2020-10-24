import { ErrorString, InvalidOperationException } from "../../shared"

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
        return min2(source, selector)
    } else {
        return min1(source)
    }
}

const min1 = async (source: AsyncIterable<number>) => {
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

const min2 = async (source: AsyncIterable<number>, selector: (x: number) => number) => {
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
