import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * @throws {InvalidOperationException} No Elements
 */
export function max(source: Iterable<number>): number
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export function max<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function max<TSource>(
    source: Iterable<TSource> | Iterable<number>,
    selector?: (x: TSource) => number): number {
    if (selector) {
        return max_2<TSource>(source as Iterable<TSource>, selector)
    } else {
        return max_1(source as Iterable<number>)
    }
}

function max_1(source: Iterable<number>): number {
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

function max_2<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number {
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
