import { ErrorString, InvalidOperationException } from "../../shared/TypesAndHelpers"

/**
 * @throws {InvalidOperationException}
 * @param source Iteration of Numbers
 */
export function average(source: Iterable<number>): number
/**
 * @throws {InvalidOperationException}
 */
export function average<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function average<TSource>(
    source: Iterable<TSource> | Iterable<number>,
    selector?: (x: TSource) => number): number {
    if (selector) {
        return average_2(source as Iterable<TSource>, selector)
    } else {
        return average_1(source as Iterable<number>)
    }
}

function average_1(source: Iterable<number>): number {
    let value: number | undefined
    let count: number | undefined
    for (const item of source) {
        value = (value || 0) + item
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}

function average_2<TSource>(source: Iterable<TSource>, func: (x: TSource) => number): number {
    let value: number | undefined
    let count: number | undefined
    for (const item of source) {
        value = (value || 0) + func(item)
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}
