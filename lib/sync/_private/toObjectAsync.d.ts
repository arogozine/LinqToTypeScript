/**
 * Converts the Iteration to an Object. Duplicate values will be overriden.
 * @param source An Iterable<T> to filter.
 * @param selector A async function to determine the Key based on the value.
 * @returns Promise for Mapping of Key to Value derived from the source iterable
 */
export declare function toObjectAsync<TSource>(source: Iterable<TSource>, selector: (x: TSource) => Promise<string>): Promise<{
    [key: string]: TSource;
}>;
