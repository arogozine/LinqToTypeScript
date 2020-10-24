import { ErrorString, InvalidOperationException } from "../../shared"

/**
 * Returns the only element of a sequence that satisfies a specified condition (if specified),
 * and throws an exception if more than one such element exists.
 * @param source An Iterable<T> to return a single element from.
 * @param predicate A function to test an element for a condition. (Optional)
 * @throws {InvalidOperationException} No element satisfies the condition in predicate. OR
 * More than one element satisfies the condition in predicate. OR
 * The source sequence is empty.
 * @returns The single element of the input sequence that satisfies a condition.
 */
export function single<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource {
    if (predicate) {
        return single2(source, predicate)
    } else {
        return single1(source)
    }
}

const single1 = <TSource>(source: Iterable<TSource>): TSource => {
    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
        if (hasValue === true) {
            throw new InvalidOperationException(ErrorString.MoreThanOneElement)
        } else {
            hasValue = true
            singleValue = value
        }
    }

    if (hasValue === false) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return singleValue as TSource
}

const single2 = <TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource => {
    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
        if (predicate(value)) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneMatchingElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }
    }

    if (hasValue === false) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return singleValue as TSource
}
