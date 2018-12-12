import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * Returns the last element of a sequence.
 * If predicate is specified, the last element of a sequence that satisfies a specified condition.
 * @param source An Iterable<T> to return the last element of.
 * @param predicate A function to test each element for a condition. Optional.
 * @throws {InvalidOperationException} The source sequence is empty.
 * @returns The value at the last position in the source sequence
 * or the last element in the sequence that passes the test in the specified predicate function.
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
