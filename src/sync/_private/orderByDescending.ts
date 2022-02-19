import { IComparer } from "../../types/IComparer"
import { IEnumerable } from "../../types/IEnumerable"
import { IOrderedEnumerable } from "../../types/IOrderedEnumerable"
import { OrderedEnumerable } from "../OrderedEnumerable"

export const orderByDescending = <TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedEnumerable<TSource> => {
    return OrderedEnumerable.generate<TSource, TKey>(source, keySelector, false, comparer)
}
