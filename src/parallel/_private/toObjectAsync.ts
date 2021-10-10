/**
 * Converts an Async Iterable to a key value pair object
 * @param source Iteration to Convert to an Object
 * @param selector Async Key Selector
 * @returns KVP Object
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
