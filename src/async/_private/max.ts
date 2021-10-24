import { ErrorString, InvalidOperationException } from "../../shared"

type MaxFunc = {
    /**
     * Returns the maximum value in a sequence of values.
     * @param source A sequence of values to determine the maximum value of.
     * @throws {InvalidOperationException} source contains no elements.
     * @returns The maximum value in the sequence.
     */
    (source: AsyncIterable<number>): Promise<number>
    /**
     * Invokes a transform function on each element of a sequence and returns the maximum value.
     * @param source A sequence of values to determine the maximum value of.
     * @param selector A transform function to apply to each element.
     * @throws {InvalidOperationException} source contains no elements.
     * @returns The maximum value in the sequence.
     */
    <TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
}

export const max: MaxFunc = <TSource>(
    source: AsyncIterable<TSource> | AsyncIterable<number>,
    selector?: (x: TSource) => number): Promise<number> => {
    if (selector) {
        return max2<TSource>(source as AsyncIterable<TSource>, selector)
    } else {
        return max1(source as AsyncIterable<number>)
    }
}

const max1 = async (source: AsyncIterable<number>) => {
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

const max2 = async <TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => number) => {
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
