/**
 * Converts the Iteration to an Object. Duplicate values will be overriden.
 * @param source An AsyncIterable<T> to filter.
 * @param selector A async function to determine the Key based on the value.
 * @returns Promise for Mapping of Key to Value derived from the source iterable
 */
export const toObjectAsync = async <TSource, TKey extends keyof any>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<TKey>): Promise<Record<TKey, TSource>> => {

    const map: Partial<Record<TKey, TSource>> = {}

    for await (const value of source) {
        map[await selector(value)] = value
    }

    return map as Record<TKey, TSource>
}
