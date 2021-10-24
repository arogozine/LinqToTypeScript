import { ErrorString, InvalidOperationException } from "../../shared"

type AverageFunc = {
    /**
     * Computes the average of a sequence of number values.
     * @param source A sequence of values to calculate the average of.
     * @throws {InvalidOperationException} source contains no elements.
     * @returns The average of the sequence of values.
     */
    (source: Iterable<number>): number
    /**
     * Computes the average of a sequence of values
     * that are obtained by invoking a transform function on each element of the input sequence.
     * @param source A sequence of values to calculate the average of.
     * @param selector A transform function to apply to each element.
     * @throws {InvalidOperationException} source contains no elements.
     * @returns The average of the sequence of values.
     */
    <TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
}

export const average: AverageFunc = <TSource>(
    source: Iterable<TSource> | Iterable<number>,
    selector?: (x: TSource) => number): number => {
    if (selector) {
        return average2(source as Iterable<TSource>, selector)
    } else {
        return average1(source as Iterable<number>)
    }
}

const average1 = (source: Iterable<number>): number => {
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

const average2 = <TSource>(source: Iterable<TSource>, func: (x: TSource) => number): number => {
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
