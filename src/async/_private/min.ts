import { ErrorString, InvalidOperationException } from "../../shared"

type MinAsync = {
    (source: AsyncIterable<number>): Promise<number>
    <TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
}

export const min: MinAsync = (source: AsyncIterable<number>, selector?: (x: number) => number): Promise<number> => {
    if (selector) {
        return min2(source, selector)
    } else {
        return min1(source)
    }
}

const min1 = async (source: AsyncIterable<number>) => {
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

const min2 = async (source: AsyncIterable<number>, selector: (x: number) => number) => {
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
