import { IAsyncEnumerable, IAsyncEqualityComparer, IEqualityComparer } from "../../types";
import { IGrouping } from "../../types/IGrouping";
export declare function groupByAsync<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<number> | number): IAsyncEnumerable<IGrouping<number, TSource>>;
export declare function groupByAsync<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<string> | string): IAsyncEnumerable<IGrouping<string, TSource>>;
export declare function groupByAsync<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey, comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
export declare function groupByAsync_0_Simple<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<any>): IAsyncEnumerable<IGrouping<any, TSource>>;
export declare function groupByAsync_0<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey, comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
