import { IComparer, IEnumerable, IOrderedAsyncEnumerable } from "../../types"
import { OrderedEnumerable } from "../OrderedEnumerable"

export function orderByAsync<TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedEnumerable.generateAsync<TSource, TKey>(source, keySelector, true, comparer)
}
