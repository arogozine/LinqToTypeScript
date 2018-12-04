import { ArgumentOutOfRangeException } from "../../shared/ArgumentOutOfRangeException"

/**
 * Returns the element at a specified index in a sequence.
 * @param source An IEnumerable<T> to return an element from.
 * @param index The zero-based index of the element to retrieve.
 * @throws {ArgumentOutOfRangeException}
 * index is less than 0 or greater than or equal to the number of elements in source.
 */
export function elementAt<TSource>(source: Iterable<TSource>, index: number): TSource {
    if (index < 0) {
        throw new ArgumentOutOfRangeException("index")
    }

    let i = 0
    for (const item of source) {
        if (index === i++) {
            return item
        }
    }

    throw new ArgumentOutOfRangeException("index")
}
