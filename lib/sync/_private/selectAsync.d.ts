import { IAsyncEnumerable } from "../../types";
export declare function selectAsync<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>;
export declare function selectAsync<TSource extends {
    [key: string]: Promise<any>;
}, TKey extends keyof TSource>(source: Iterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>;
