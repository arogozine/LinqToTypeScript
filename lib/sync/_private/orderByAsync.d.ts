import { IComparer, IEnumerable, IOrderedAsyncEnumerable } from "../../types";
export declare function orderByAsync<TSource, TKey>(source: IEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
