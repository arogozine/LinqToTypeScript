import { IAsyncEnumerable } from "../types";
/**
 * The class behind IAsyncEnumerable<T>
 * @private
 */
export declare class BasicAsyncEnumerable<TSource> {
    private readonly iterator;
    constructor(iterator: () => AsyncIterableIterator<TSource>);
    [Symbol.asyncIterator](): AsyncIterableIterator<TSource>;
}
export interface BasicAsyncEnumerable<TSource> extends IAsyncEnumerable<TSource> {
}
