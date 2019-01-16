import { IParallelEnumerable, TypedData } from "../types";
/**
 * Base implementation of IParallelEnumerable<T>
 * @private
 */
export declare class BasicParallelEnumerable<TSource> {
    readonly dataFunc: TypedData<TSource>;
    constructor(dataFunc: TypedData<TSource>);
    [Symbol.asyncIterator](): AsyncIterableIterator<TSource>;
}
export interface BasicParallelEnumerable<TSource> extends IParallelEnumerable<TSource> {
}
