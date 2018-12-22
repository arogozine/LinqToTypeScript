import { StrictEqualityComparer } from "../../shared/StrictEqualityComparer"
import { IEnumerable, IEqualityComparer, SelectorKeyType } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"
import { groupBy_0, groupBy_0_Simple } from "./groupByShared"

/**
 * Groups the elements of a sequence according to a specified key selector function
 * and creates a result value from each group and its key.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param resultSelector A function to create a result value from each group.
 * @returns A collection of elements of type TResult where each element
 * represents a projection over a group and its key.
 */
export function groupByWithResult<TSource, TKey extends SelectorKeyType, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
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
export function groupByWithResult<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult,
    comparer: IEqualityComparer<TKey>): IEnumerable<TResult>

export function groupByWithResult<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult,
    comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {

    if (comparer) {
        return groupBy_2<TSource, TKey, TResult>(source,
            keySelector,
            resultSelector,
            comparer)
    } else {
        return groupBy_2_Simple<TSource, any, TResult>(source,
            keySelector,
            resultSelector as (x: TKey, values: IEnumerable<TSource>) => TResult)
    }
}

function groupBy_2_Simple<TSource, TKey extends SelectorKeyType, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult> {

    function *iterator(): IterableIterator<TResult> {
        const groupByResult = groupBy_0_Simple(source, keySelector)

        for (const group of groupByResult()) {
            yield resultSelector(group.key, group)
        }
    }

    return new BasicEnumerable(iterator)
}

function groupBy_2<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult,
    comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IEnumerable<TResult> {

    function *iterator(): IterableIterator<TResult> {
        const groupByResult = groupBy_0(source, keySelector, comparer)

        for (const group of groupByResult()) {
            yield resultSelector(group.key, group)
        }
    }

    return new BasicEnumerable(iterator)
}
