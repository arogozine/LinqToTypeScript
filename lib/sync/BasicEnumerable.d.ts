import { IEnumerable } from "../types";
/**
 * Basic Enumerable. Usually returned from the Enumerable class.
 * @private Use @see {IEnumerable} instead
 */
export declare class BasicEnumerable<TSource> {
    private readonly iterator;
    constructor(iterator: () => IterableIterator<TSource>);
    [Symbol.iterator](): IterableIterator<TSource>;
}
export interface BasicEnumerable<TSource> extends IEnumerable<TSource> {
}
