import type { IAsyncParallel, IComparer, IOrderedParallelEnumerable } from "../../types"
import { OrderedParallelEnumerable } from "../OrderedParallelEnumerable"

export const orderByDescending = <TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource> => {
    return OrderedParallelEnumerable.generate(source, keySelector, false, comparer)
}
