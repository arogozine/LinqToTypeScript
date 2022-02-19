import { ErrorString, InvalidOperationException } from "../../shared"

type MaxFunc = {
    (source: AsyncIterable<number>): Promise<number>
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
