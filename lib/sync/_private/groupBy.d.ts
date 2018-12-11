import { IEnumerable, IEqualityComparer, IGrouping } from "../../types";
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export declare function groupBy<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>;
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export declare function groupBy<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>;
/**
 * Groups the elements of a sequence according to a key selector function.
 * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param comparer An IEqualityComparer<T> to compare keys.
 */
export declare function groupBy<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>;
