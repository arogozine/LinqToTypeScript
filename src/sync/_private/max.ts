import { ErrorString, InvalidOperationException } from "../../shared"

type MaxFunc = {
    (source: Iterable<number>): number
    <TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
}

export const max: MaxFunc = <TSource>(
    source: Iterable<TSource> | Iterable<number>,
    selector?: (x: TSource) => number): number => {
    if (selector) {
        return max2<TSource>(source as Iterable<TSource>, selector)
    } else {
        return max1(source as Iterable<number>)
    }
}

const max1 = (source: Iterable<number>): number => {
    let maxItem: number | null = null
    for (const item of source) {
        maxItem = Math.max(maxItem || Number.NEGATIVE_INFINITY, item)
    }

    if (maxItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return maxItem
    }
}

const max2 = <TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number => {
    let maxItem: number | null = null
    for (const item of source) {
        maxItem = Math.max(maxItem || Number.NEGATIVE_INFINITY, selector(item))
    }

    if (maxItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return maxItem
    }
}
