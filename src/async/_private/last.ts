import { ErrorString, InvalidOperationException } from "../../shared"

export const last = <TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> => {
    if (predicate) {
        return last2(source, predicate)
    } else {
        return last1(source)
    }
}

const last1 = async <T>(source: AsyncIterable<T>) => {
    let lastItem: T | null = null
    let hasValue = false

    for await (const value of source) {
        lastItem = value
        hasValue = true
    }

    if (!hasValue) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return lastItem as T
}

const last2 = async <TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean) => {
    let lastItem: TSource | null = null
    let hasValue = false

    for await (const value of source) {
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
