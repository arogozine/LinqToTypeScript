import type { IAsyncEnumerable, IComparer, IOrderedAsyncEnumerable } from "../../types"
import { OrderedAsyncEnumerable } from "../OrderedAsyncEnumerable"

export const orderByDescendingAsync = <TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> => {
    return OrderedAsyncEnumerable.generateAsync(source, keySelector, false, comparer)
}
