/**
 * Creates an array from a AsyncIterable<T>.
 * @param source An AsyncIterable<T> to create an array from.
 * @returns An array of elements
 */
export declare function toArray<TSource>(source: AsyncIterable<TSource>): Promise<TSource[]>;
