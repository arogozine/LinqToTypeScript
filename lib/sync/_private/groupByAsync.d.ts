import { IAsyncEnumerable, IAsyncEqualityComparer, IEqualityComparer } from "../../types";
import { IGrouping } from "../../types/IGrouping";
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IAsyncEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export declare function groupByAsync<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<number> | number): IAsyncEnumerable<IGrouping<number, TSource>>;
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IAsyncEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export declare function groupByAsync<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<string> | string): IAsyncEnumerable<IGrouping<string, TSource>>;
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param comparer An IEqualityComparer<T> or IAsyncEqualityComparer<T> to compare keys.
 * @returns An IAsyncEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export declare function groupByAsync<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey, comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
export declare function groupByAsync_0_Simple<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<any>): IAsyncEnumerable<IGrouping<any, TSource>>;
export declare function groupByAsync_0<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey, comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
