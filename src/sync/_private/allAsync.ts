/**
 * Determines whether all elements of a sequence satisfy a condition.
 * @param source An Iterable<T> that contains the elements to apply the predicate to.
 * @param predicate A function to test each element for a condition.
 * @returns ``true`` if every element of the source sequence passes the test in the specified predicate,
 * or if the sequence is empty; otherwise, ``false``.
 */
export const allAsync = async <TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>) => {
    for (const item of source) {
        if (await predicate(item) === false) {
            return false
        }
    }

    return true
}
