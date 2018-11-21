import { IEnumerable, IEqualityComparer, IGrouping } from "../../types"
import { groupBy_0, groupBy_0_Simple } from "./groupByShared"

export function groupBy<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>
export function groupBy<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>
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
