import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

export function min(source: AsyncIterable<number>): Promise<number>
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
