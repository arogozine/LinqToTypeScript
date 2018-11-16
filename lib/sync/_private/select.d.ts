import { IEnumerable } from "../IEnumerable";
export declare function select<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult>;
export declare function select<TSource, TKey extends keyof TSource>(source: Iterable<TSource>, key: TKey): IEnumerable<TSource[TKey]>;
