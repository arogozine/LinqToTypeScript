import type { IComparer, IAsyncEnumerable, IOrderedAsyncEnumerable } from "../../types"
import { OrderedAsyncEnumerable } from "../OrderedAsyncEnumerable"

export const order = <TSource>(
    source: IAsyncEnumerable<TSource>,
    comparer?: IComparer<TSource>): IOrderedAsyncEnumerable<TSource> => {
    return OrderedAsyncEnumerable.generate<TSource, TSource>(source, (x: TSource) => x, true, comparer)
}