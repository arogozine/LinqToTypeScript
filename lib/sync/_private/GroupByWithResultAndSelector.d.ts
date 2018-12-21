import { IEnumerable, IEqualityComparer, SelectorKeyType } from "../../types";
/**
 * Groups the elements of a sequence according to a specified key selector function and
 * creates a result value from each group and its key.
 * If specified, the key values are compared by using a specified comparer.
 * The elements of each group are projected by using a specified function.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
 * @param resultSelector A function to create a result value from each group.
 * @param comparer An IEqualityComparer<T> to compare keys with.
 * @returns A collection of elements of type TResult
 * where each element represents a projection over a group and its key.
 */
export declare function groupByWithResultAndSelector<TSource, TKey extends SelectorKeyType, TElement, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, elementSelector: (x: TSource) => TElement, resultSelector: (key: TKey, values: IEnumerable<TElement>) => TResult, comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>;
