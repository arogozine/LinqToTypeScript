/**
 * Converts the Async Itertion to a Set
 * @param source Iteration
 * @returns Set containing the iteration values
 */
export const toSet = async <TSource>(
    source: AsyncIterable<TSource>): Promise<Set<TSource>> => {
    const set = new Set<TSource>()
    for await (const item of source) {
        set.add(item)
    }
    return set
}
