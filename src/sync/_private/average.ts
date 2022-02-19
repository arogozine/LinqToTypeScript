import { ErrorString, InvalidOperationException } from "../../shared"

type AverageFunc = {
    (source: Iterable<number>): number
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