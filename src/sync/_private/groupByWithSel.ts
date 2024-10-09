import type { IEnumerable, IEqualityComparer, IGrouping, SelectorKeyType } from "../../types"
import { groupBy_1, groupBy_1_Simple } from "./groupByShared"

export type GroupByWithSelFunc = {
    <TSource, TKey extends SelectorKeyType, TElement>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<TKey, TElement>>
    <TSource, TKey, TElement>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>
}

export const groupByWithSel = <TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<ReturnType<typeof keySelector>, TElement>> => {

    if (comparer) {
        return groupBy_1(source,
            keySelector as (x: TSource) => TKey, elementSelector, comparer)
    } else {
        return groupBy_1_Simple(source,
            keySelector as (x: TSource) => number | string, elementSelector)
    }
}
