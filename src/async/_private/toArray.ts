/**
 * Creates an array from a AsyncIterable<T>.
 * @param source An AsyncIterable<T> to create an array from.
 * @returns An array of elements
 */
export const toArray = async <TSource>(source: AsyncIterable<TSource>): Promise<TSource[]> => {
    const array = []
    for await (const item of source) {
        array.push(item)
    }
    return array
}
