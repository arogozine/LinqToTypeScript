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
    let hasValue = false

    for (const value of source) {
        lastItem = value
        hasValue = true
    }

    if (!hasValue) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return lastItem as TSource
}

const last2 = <TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource => {
    let lastItem: TSource | undefined
    let hasValue = false

    for (const value of source) {
        if (predicate(value) === true) {
            lastItem = value
            hasValue = true
        }
    }

    if (!hasValue) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return lastItem as TSource
}
