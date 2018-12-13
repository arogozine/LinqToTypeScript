/**
 * Converts an Async Iterable to a key value pair object
 * @param source Iteration to Convert to an Object
 * @param selector Key Selector
 * @returns KVP Object
 */
export declare function toObject<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => string): Promise<{
    [key: string]: TSource;
}>;
