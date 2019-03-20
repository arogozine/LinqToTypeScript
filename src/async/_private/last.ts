import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * Returns the last element of a sequence.
 * If predicate is specified, the last element of a sequence that satisfies a specified condition.
 * @param source An AsyncIterable<T> to return the last element of.
 * @param predicate A function to test each element for a condition. Optional.
 * @throws {InvalidOperationException} The source sequence is empty.
 * @returns The value at the last position in the source sequence
 * or the last element in the sequence that passes the test in the specified predicate function.
 */
export async function last<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
    if (predicate) {
        return last2(source, predicate)
    } else {
        return last1(source)
    }
}

const last1 = async <T>(source: AsyncIterable<T>) => {
    let lastItem: T | null = null

    for await (const value of source) {
        lastItem = value
    }

    if (!lastItem) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return lastItem
}

const last2 = async <TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean) => {
    let lastItem: TSource | null = null

    for await (const value of source) {
        if (predicate(value) === true) {
            lastItem = value
        }
    }

    if (!lastItem) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return lastItem
}
