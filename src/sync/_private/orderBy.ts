import { IComparer, IEnumerable, IOrderedEnumerable } from "../../types"
import { OrderedEnumerable } from "../OrderedEnumerable"

export const orderBy = <TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedEnumerable<TSource> => {
    return OrderedEnumerable.generate<TSource, TKey>(source, keySelector, true, comparer)
}
