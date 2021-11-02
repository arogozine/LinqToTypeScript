import { ErrorString, InvalidOperationException } from "../../shared"

type AverageFunc = {
    /**
     * Computes the average of a sequence of number values.
     * @param source A sequence of values to calculate the average of.
     * @throws {InvalidOperationException} source contains no elements.
     */
    (source: AsyncIterable<number>): Promise<number>
    /**
     * Computes the average of a sequence of values
     * that are obtained by invoking a transform function on each element of the input sequence.
     * @param source A sequence of values to calculate the average of.
     * @param selector A transform function to apply to each element.
     * @throws {InvalidOperationException} source contains no elements.
     */
    <TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
}

export const average: AverageFunc = async <TSource>(
    source: AsyncIterable<TSource> | AsyncIterable<number>,
    selector?: (x: TSource) => number): Promise<number> => {

    let value = 0
    let count = 0

    if (selector) {
        for await (const item of source) {
            value = value + selector(item as TSource)
            count = count + 1
        }
    } else {
        for await (const item of source) {
            value = value + (item as number)
            count = count + 1
        }
    }

    if (count === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / count
}