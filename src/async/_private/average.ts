import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * Computes the average of a sequence of number values.
 * @param source A sequence of values to calculate the average of.
 * @throws {InvalidOperationException} source contains no elements.
 */
export function average(
    source: AsyncIterable<number>): Promise<number>
/**
 * Computes the average of a sequence of values
 * that are obtained by invoking a transform function on each element of the input sequence.
 * @param source A sequence of values to calculate the average of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 */
export function average<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
export function average<TSource>(
    source: AsyncIterable<TSource> | AsyncIterable<number>,
    selector?: (x: TSource) => number): Promise<number> {
    if (selector) {
        return average2(source as AsyncIterable<TSource>, selector)
    } else {
        return average1(source as AsyncIterable<number>)
    }
}

const average1 = async (source: AsyncIterable<number>) => {
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

const average2 = async <TSource>(
    source: AsyncIterable<TSource>, func: (x: TSource) => number) => {
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
