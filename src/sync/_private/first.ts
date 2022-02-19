import { ErrorString, InvalidOperationException } from "../../shared"

export const first = <TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource => {
    if (predicate) {
        return first2(source, predicate)
    } else {
        return first1(source)
    }
}

const first1 = <T>(source: Iterable<T>) => {
    // eslint-disable-next-line no-shadow
    const first = source[Symbol.iterator]().next()

    if (first.done === true) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return first.value
}

const first2 = <T>(source: Iterable<T>, predicate: (x: T) => boolean): T => {
    for (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}
