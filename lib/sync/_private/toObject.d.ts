/**
 * Converts the Iteration to an Object. Duplicate values will be overriden.
 * @param source An Iterable<T> to filter.
 * @param selector A function to determine the Key based on the value.
 * @returns KVP Object
 */
export declare function toObject<TSource>(source: Iterable<TSource>, selector: (x: TSource) => string): {
    [key: string]: TSource;
};
