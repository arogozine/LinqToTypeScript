import type { IComparer, IEnumerable, IOrderedEnumerable } from "../../types"
import { OrderedEnumerable } from "../OrderedEnumerable"

export const order = <TSource>(
    source: IEnumerable<TSource>,
    comparer?: IComparer<TSource>): IOrderedEnumerable<TSource> => {
    return OrderedEnumerable.generate<TSource, TSource>(source, (x: TSource) => x, true, comparer)
}