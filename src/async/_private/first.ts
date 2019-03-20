import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * Returns the first element of a sequence.
 * If predicate is specified, returns the first element in a sequence that satisfies a specified condition.
 * @param source The AsyncIterable<T> to return the first element of.
 * @param predicate A function to test each element for a condition. Optional.
 * @throws {InvalidOperationException} The source sequence is empty.
 * @returns The first element in the specified sequence.
 * If predicate is specified,
 * the first element in the sequence that passes the test in the specified predicate function.
 */
export function first<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
    if (predicate) {
        return first2(source, predicate)
    } else {
        return first1(source)
    }
}

const first1 = async <T>(source: AsyncIterable<T>) => {
    const firstElement = await source[Symbol.asyncIterator]().next()

    if (firstElement.done === true) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return firstElement.value
}

const first2 = async <T>(source: AsyncIterable<T>, predicate: (x: T) => boolean) => {
    for await (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}
