import { IEnumerable, IEqualityComparer, IGrouping } from "../../types"
import { groupBy_0, groupBy_0_Simple } from "./groupByShared"

/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export function groupBy<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export function groupBy<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>
/**
 * Groups the elements of a sequence according to a key selector function.
 * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param comparer An IEqualityComparer<T> to compare keys.
 */
export function groupBy<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>
export function groupBy<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<any, TSource>> {

    if (comparer) {
        return groupBy_0<TSource, TKey>(source,
            keySelector as (x: TSource) => TKey, comparer)
    } else {
        return groupBy_0_Simple(source,
            keySelector as ((x: TSource) => number) | ((x: TSource) => string))
    }
}
