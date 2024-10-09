import type { IComparer, IEnumerable, IOrderedAsyncEnumerable } from "../../types"
import { OrderedEnumerable } from "../OrderedEnumerable"

export const orderByDescendingAsync = <TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> => {
    return OrderedEnumerable.generateAsync<TSource, TKey>(source, keySelector, false, comparer)
}
