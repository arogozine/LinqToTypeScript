import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * @throws {InvalidOperationException} No Elements
 * @param source Async Iteration of Numbers
 */
export function max(source: AsyncIterable<number>): Promise<number>
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export function max<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
export function max<TSource>(
    source: AsyncIterable<TSource> | AsyncIterable<number>,
    selector?: (x: TSource) => number): Promise<number> {
    if (selector) {
        return max_2<TSource>(source as AsyncIterable<TSource>, selector)
    } else {
        return max_1(source as AsyncIterable<number>)
    }
}

async function max_1(source: AsyncIterable<number>): Promise<number> {
    let maxItem: number | null = null
    for await (const item of source) {
        maxItem = Math.max(maxItem || Number.NEGATIVE_INFINITY, item)
    }

    if (maxItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return maxItem
    }
}

async function max_2<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number> {
    let maxItem: number | null = null
    for await (const item of source) {
        maxItem = Math.max(maxItem || Number.NEGATIVE_INFINITY, selector(item))
    }

    if (maxItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return maxItem
    }
}
