import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

export function average(
    source: AsyncIterable<number>): Promise<number>
export function average<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
export function average<TSource>(
    source: AsyncIterable<TSource> | AsyncIterable<number>,
    selector?: (x: TSource) => number): Promise<number> {
    if (selector) {
        return average_2(source as AsyncIterable<TSource>, selector)
    } else {
        return average_1(source as AsyncIterable<number>)
    }
}

async function average_1(source: AsyncIterable<number>): Promise<number> {
    let value: number | undefined
    let count: number | undefined
    for await (const item of source) {
        value = (value || 0) + item
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}

async function average_2<TSource>(
    source: AsyncIterable<TSource>, func: (x: TSource) => number): Promise<number> {
    let value: number | undefined
    let count: number | undefined
    for await (const item of source) {
        value = (value || 0) + func(item)
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}
