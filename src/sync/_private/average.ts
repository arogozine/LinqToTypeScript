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

    let value = 0
    let count = 0

    if (selector) {
        for (const item of source) {
            value = value + selector(item as TSource)
            count = count + 1
        }
    } else {
        for (const item of source) {
            value = value + (item as number)
            count = count + 1
        }
    }

    if (count === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / count
}