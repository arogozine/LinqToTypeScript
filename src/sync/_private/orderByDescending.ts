import type { IComparer, IEnumerable, IOrderedEnumerable } from "../../types"
import { OrderedEnumerable } from "../OrderedEnumerable"

export const orderByDescending = <TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedEnumerable<TSource> => {
    return OrderedEnumerable.generate<TSource, TKey>(source, keySelector, false, comparer)
}
