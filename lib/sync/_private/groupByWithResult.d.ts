import { IEnumerable, IEqualityComparer, SelectorKeyType } from "../../types";
export declare function groupByWithResult<TSource, TKey extends SelectorKeyType, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>;
export declare function groupByWithResult<TSource, TKey, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult, comparer: IEqualityComparer<TKey>): IEnumerable<TResult>;
