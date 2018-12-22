import { IEnumerable, IEqualityComparer, SelectorKeyType } from "../../types";
/**
 * Groups the elements of a sequence according to a specified key selector function
 * and creates a result value from each group and its key.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param resultSelector A function to create a result value from each group.
 * @returns A collection of elements of type TResult where each element
 * represents a projection over a group and its key.
 */
export declare function groupByWithResult<TSource, TKey extends SelectorKeyType, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>;
/**
 * Groups the elements of a sequence according to a specified key selector function
 * and creates a result value from each group and its key.
 * The keys are compared by using a specified comparer.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param resultSelector A function to create a result value from each group.
 * @param comparer An IEqualityComparer<T> to compare keys with.
 * @returns A collection of elements of type TResult
 * where each element represents a projection over a group and its key.
 */
export declare function groupByWithResult<TSource, TKey, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult, comparer: IEqualityComparer<TKey>): IEnumerable<TResult>;
