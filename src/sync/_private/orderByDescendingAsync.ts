import { IOrderedAsyncEnumerable } from "../../async/IOrderedAsyncEnumerable"
import { IComparer } from "../../shared/IComparer"
import { IEnumerable } from "../IEnumerable"
import { OrderedEnumerable } from "../OrderedEnumerable"

export function orderByDescendingAsync<TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedEnumerable.generateAsync<TSource, TKey>(source, keySelector, false, comparer)
}
