import { ErrorString, InvalidOperationException } from "../../shared/TypesAndHelpers"

/**
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains no matching element
 */
export function last<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource {
    if (predicate) {
        return last_2(source, predicate)
    } else {
        return last_1(source)
    }
}

function last_1<TSource>(source: Iterable<TSource>): TSource {
    let lastItem: TSource | undefined

    for (const value of source) {
        lastItem = value
    }

    if (!lastItem) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return lastItem
}

function last_2<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource {
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
