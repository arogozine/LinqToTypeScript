import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * Returns first element in sequence that satisfies predicate otherwise
 * returns the first element in the sequence.
 * @param source An Iterable<T> to return an element from.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The first element in the sequence
 * or the first element that passes the test in the specified predicate function.
 * @throws {InvalidOperationException} No elements in Iteration matching predicate
 */
export function first<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource {
    if (predicate) {
        return first_2(source, predicate)
    } else {
        return first_1(source)
    }
}

function first_1<T>(source: Iterable<T>) {
    // tslint:disable-next-line:no-shadowed-variable
    const first = source[Symbol.iterator]().next()

    if (first.done === true) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return first.value
}

function first_2<T>(source: Iterable<T>, predicate: (x: T) => boolean): T {
    for (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}
