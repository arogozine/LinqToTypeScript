/**
 * Determines whether all elements of a sequence satisfy a condition.
 * @param source An AsyncIterable<T> that contains the elements to apply the predicate to.
 * @param predicate A function to test each element for a condition.
 */
export async function allAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    for await (const item of source) {
        if (await predicate(item) === false) {
            return false
        }
    }

    return true
}
