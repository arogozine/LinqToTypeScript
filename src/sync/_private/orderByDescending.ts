import { IComparer } from "../../shared/IComparer"
import { IEnumerable } from "../IEnumerable"
import { IOrderedEnumerable } from "../IOrderedEnumerable"
import { OrderedEnumerable } from "../OrderedEnumerable"

export function orderByDescending<TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedEnumerable<TSource> {
    return OrderedEnumerable.generate<TSource, TKey>(source, keySelector, false, comparer)
}
