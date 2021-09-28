/**
 * Converts the Iteration to an Object. Duplicate values will be overriden.
 * @param source An AsyncIterable<T> to filter.
 * @param selector A async function to determine the Key based on the value.
 * @returns Promise for Mapping of Key to Value derived from the source iterable
 */
export const toObjectAsync = async <TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<string>): Promise<{[key: string]: TSource}> => {

    const map: {[key: string]: TSource} = {}

    for await (const value of source) {
        map[await selector(value)] = value
    }

    return map
}
