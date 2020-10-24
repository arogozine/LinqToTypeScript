import { ErrorString, InvalidOperationException } from "../../shared"

/**
 * Returns the last element of a sequence that satisfies a specified condition.
 * @param source An AsyncIterable<T> to return the last element of.
 * @param predicate A function to test each element for a condition.
 * @throws {InvalidOperationException} The source sequence is empty.
 * @returns The last element in the sequence that passes the test in the specified predicate function.
 */
export async function lastAsync<TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
    let last: TSource | null = null

    for await (const value of source) {
        if (await predicate(value) === true) {
            last = value
        }
    }

    if (!last) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return last
}
