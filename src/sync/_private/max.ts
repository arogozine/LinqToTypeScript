import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * Returns the maximum value in a sequence of values.
 * @param source A sequence of values to determine the maximum value of.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The maximum value in the sequence.
 */
export function max(source: Iterable<number>): number
/**
 * Invokes a transform function on each element of a sequence and returns the maximum value.
 * @param source A sequence of values to determine the maximum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The maximum value in the sequence.
 */
export function max<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function max<TSource>(
    source: Iterable<TSource> | Iterable<number>,
    selector?: (x: TSource) => number): number {
    if (selector) {
        return max2<TSource>(source as Iterable<TSource>, selector)
    } else {
        return max1(source as Iterable<number>)
    }
}

const max1 = (source: Iterable<number>): number => {
    let maxItem: number | null = null
    for (const item of source) {
        maxItem = Math.max(maxItem || Number.NEGATIVE_INFINITY, item)
    }

    if (maxItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return maxItem
    }
}

const max2 = <TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number => {
    let maxItem: number | null = null
    for (const item of source) {
        maxItem = Math.max(maxItem || Number.NEGATIVE_INFINITY, selector(item))
    }

    if (maxItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return maxItem
    }
}
