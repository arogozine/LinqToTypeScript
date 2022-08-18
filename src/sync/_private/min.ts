import { ErrorString, InvalidOperationException } from "../../shared"

type MinFunc = {
    (source: Iterable<number>): number
    <TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
}

export const min: MinFunc = <TSource>(source: Iterable<TSource> | Iterable<number>,
                             selector?: (x: TSource) => number): number => {
    if (selector) {
        return min2(source as Iterable<TSource>, selector)
    } else {
        return min1(source as Iterable<number>)
    }
}

const min1 = (source: Iterable<number>) => {
    let minItem: number | null = null
    for (const item of source) {
        minItem = Math.min(minItem ?? Number.POSITIVE_INFINITY, item)
    }

    if (minItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return minItem
    }
}

const min2 = <TSource>(source: Iterable<TSource>, selector: (x: TSource) => number) => {
    let minItem: number | null = null
    for (const item of source) {
        minItem = Math.min(minItem ?? Number.POSITIVE_INFINITY, selector(item))
    }

    if (minItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return minItem
    }
}
