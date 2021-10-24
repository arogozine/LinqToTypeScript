/**
 * Returns first element in sequence that satisfies. Returns null if no value found.
 * @param source An AsyncIterable<TSource> to return an element from.
 * @param predicate An async function to test each element for a condition.
 * @returns The first element that passes the test in the specified predicate function.
 * Returns null if no value found.
 */
export const firstOrDefaultAsync = async <TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> => {
    for await (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    return null
}
