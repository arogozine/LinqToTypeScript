import { ErrorString, InvalidOperationException } from "../../shared"

export const last = <TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource => {
    if (predicate) {
        return last2(source, predicate)
    } else {
        return last1(source)
    }
}

const last1 = <TSource>(source: Iterable<TSource>): TSource => {
    let lastItem: TSource | undefined

    for (const value of source) {
        lastItem = value
    }

    if (!lastItem) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return lastItem
}

const last2 = <TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource => {
    let lastItem: TSource | undefined

    for (const value of source) {
        if (predicate(value) === true) {
            lastItem = value
        }
    }

    if (!lastItem) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return lastItem
}
