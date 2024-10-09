import type { IEnumerable, IEqualityComparer, IGrouping, SelectorKeyType } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"
import { groupBy_0, groupBy_0_Simple } from "./groupByShared"

type GroupByFunc = {
    <TSource, TKey extends SelectorKeyType>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => TKey): IEnumerable<IGrouping<TKey, TSource>>
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
