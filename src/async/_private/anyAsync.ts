/**
 * Determines whether any element of a sequence satisfies a condition.
 * @param source An AsyncIterable<T> whose elements to apply the predicate to.
 * @param predicate A function to test each element for a condition.
 * @returns ``true`` if every element of the source sequence passes the test in the specified predicate,
 * or if the sequence is empty; otherwise, ``false``.
 */
export const anyAsync = async <TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>
) => {
    for await (const item of source) {
        if (await predicate(item) === true) {
            return true
        }
    }

    return false
}