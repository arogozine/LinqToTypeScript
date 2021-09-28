/**
 * Converts an Async Iterable to a key value pair object
 * @param source Iteration to Convert to an Object
 * @param selector Key Selector
 * @returns KVP Object
 */
export const toObject = async <TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => string): Promise<{[key: string]: TSource}> => {

    const map: {[key: string]: TSource} = {}

    for await (const value of source) {
        map[selector(value)] = value
    }

    return map
}
