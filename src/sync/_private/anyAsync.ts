/**
 * Determines whether any element of a sequence satisfies a condition.
 * @param source An IEnumerable<T> whose elements to apply the predicate to.
 * @param predicate A function to test each element for a condition.
 */
export async function anyAsync<TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    for (const item of source) {
        if (await predicate(item) === true) {
            return true
        }
    }

    return false
}
