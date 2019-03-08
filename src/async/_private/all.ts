/**
 * Determines whether all elements of a sequence satisfy a condition.
 * @param source An AsyncIterable<T> that contains the elements to apply the predicate to.
 * @param predicate A function to test each element for a condition.
 * @returns ``true`` if every element of the source sequence passes the test in the specified predicate,
 * or if the sequence is empty; otherwise, ``false``.
 */
export async function all<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => boolean): Promise<boolean> {
    for await (const item of source) {
        if (predicate(item) === false) {
            return false
        }
    }

    return true
}
