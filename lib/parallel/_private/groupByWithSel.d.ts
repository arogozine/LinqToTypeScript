import { IAsyncParallel, IEqualityComparer, IGrouping, IParallelEnumerable, SelectorKeyType } from "../../types";
/**
 * Groups the elements of a sequence according to a specified key selector function and
 * projects the elements for each group by using a specified function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
 * @returns An IParallelEnumerable<IGrouping<TKey, TElement>>
 * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
 */
export declare function groupByWithSel<TSource, TKey extends SelectorKeyType, TElement>(source: IAsyncParallel<TSource>, keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<TKey, TElement>>;
/**
 * Groups the elements of a sequence according to a key selector function.
 * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
 * @param comparer An IEqualityComparer<T> to compare keys.
 * @returns An IParallelEnumerable<IGrouping<TKey,TElement>>
 * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
 */
export declare function groupByWithSel<TSource, TKey, TElement>(source: IAsyncParallel<TSource>, keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>;
