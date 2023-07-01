import { IComparer, IParallelEnumerable, IOrderedParallelEnumerable } from "../../types"
import { OrderedParallelEnumerable } from "../OrderedParallelEnumerable"

export const order = <TSource>(
    source: IParallelEnumerable<TSource>,
    comparer?: IComparer<TSource>): IOrderedParallelEnumerable<TSource> => {
    return OrderedParallelEnumerable.generate<TSource, TSource>(source, (x: TSource) => x, true, comparer)
}