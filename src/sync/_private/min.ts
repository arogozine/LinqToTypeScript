import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * @throws {InvalidOperationException} No Elements
 */
export function min(source: Iterable<number>): number
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export function min<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function min<TSource>(source: Iterable<TSource> | Iterable<number>,
                             selector?: (x: TSource) => number): number {
    if (selector) {
        return min_2(source as Iterable<TSource>, selector)
    } else {
        return min_1(source as Iterable<number>)
    }
}

function min_1(source: Iterable<number>) {
    let minItem: number | null = null
    for (const item of source) {
        minItem = Math.min(minItem || Number.POSITIVE_INFINITY, item)
    }

    if (minItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return minItem
    }
}

function min_2<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number) {
    let minItem: number | null = null
    for (const item of source) {
        minItem = Math.min(minItem || Number.POSITIVE_INFINITY, selector(item))
    }

    if (minItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return minItem
    }
}
