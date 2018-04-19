import { BaseEnumerable } from "./BaseEnumerable";
/**
 * Basic Enumerable. Usually returned from the Enumerable class.
 * @private Use @see {IEnumerable} instead
 */
export declare class BasicEnumerable<TSource> extends BaseEnumerable<TSource> {
    private readonly iterator;
    constructor(iterator: () => IterableIterator<TSource>);
    [Symbol.iterator](): IterableIterator<TSource>;
}
