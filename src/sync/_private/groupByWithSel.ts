import { IEqualityComparer } from "../../shared/IEqualityComparer"
import { IGrouping } from "../../shared/IGrouping"
import { IEnumerable } from "../IEnumerable"
import { groupBy_1, groupBy_1_Simple } from "./groupByShared"

export function groupByWithSel<TSource, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => number),
    elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<number, TElement>>
export function groupByWithSel<TSource, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string, TElement>>
export function groupByWithSel<TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey),
    elementSelector: (x: TSource) => TElement,
    comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>
export function groupByWithSel<TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<any, TElement>> {

    if (comparer) {
        return groupBy_1(source,
            keySelector as (x: TSource) => TKey, elementSelector, comparer)
    } else {
        return groupBy_1_Simple(source,
            keySelector as (x: TSource) => number | string, elementSelector)
    }
}
