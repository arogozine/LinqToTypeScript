import type { IAsyncParallel, IComparer, IOrderedParallelEnumerable } from "../../types"
import { OrderedParallelEnumerable } from "../OrderedParallelEnumerable"

export const orderByAsync = <TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource> => {
    return OrderedParallelEnumerable.generateAsync(source, keySelector, true, comparer)
}
