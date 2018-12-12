/**
 * Returns the last element of a sequence that satisfies a specified condition.
 * @param source An Iterable<T> to return the last element of.
 * @param predicate A function to test each element for a condition.
 * @returns The last element in the sequence that passes the test in the specified predicate function.
 * Null if no elements.
 */
export async function lastOrDefaultAsync<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {

    let last: TSource | null = null

    for (const value of source) {
        if (await predicate(value) === true) {
            last = value
        }
    }

    return last
}
