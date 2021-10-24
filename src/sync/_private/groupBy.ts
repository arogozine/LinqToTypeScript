import { IEnumerable, IEqualityComparer, IGrouping, SelectorKeyType } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"
import { groupBy_0, groupBy_0_Simple } from "./groupByShared"

type GroupByFunc = {
    /**
     * Groups the elements of a sequence according to a specified key selector function.
     * @param source An IAsyncParallel<T> whose elements to group.
     * @param keySelector A function to extract the key for each element.
     * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
     * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
     */
    <TSource, TKey extends SelectorKeyType>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => TKey): IEnumerable<IGrouping<TKey, TSource>>
    /**
     * Groups the elements of a sequence according to a key selector function.
     * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
     * @param source An Iterable<T> whose elements to group.
     * @param keySelector A function to extract the key for each element.
     * @param comparer An IEqualityComparer<T> to compare keys.
     */
    <TSource, TKey>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>
}

export const groupBy: GroupByFunc = <TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => SelectorKeyType),
    comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<ReturnType<typeof keySelector>, TSource>> => {

    let iterable: () => IterableIterator<IGrouping<ReturnType<typeof keySelector>, TSource>>

    if (comparer) {
        iterable = groupBy_0<TSource, TKey>(source,
            keySelector as (x: TSource) => TKey, comparer)
    } else {
        iterable = groupBy_0_Simple(source,
            keySelector as (x: TSource) => SelectorKeyType)
    }

    return new BasicEnumerable(iterable)
}
