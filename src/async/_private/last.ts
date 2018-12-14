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
        return last_2(source, predicate)
    } else {
        return last_1(source)
    }
}

async function last_1<T>(source: AsyncIterable<T>): Promise<T> {
    let lastItem: T | null = null

    for await (const value of source) {
        lastItem = value
    }

    if (!lastItem) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return lastItem
}

async function last_2<TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): Promise<TSource> {
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
