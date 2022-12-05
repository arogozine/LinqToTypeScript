import { IComparer } from "../../types/IComparer"
import { IEnumerable } from "../../types/IEnumerable"
import { IOrderedEnumerable } from "../../types/IOrderedEnumerable"
import { OrderedEnumerable } from "../OrderedEnumerable"

export const order = <TSource>(
    source: IEnumerable<TSource>,
    comparer?: IComparer<TSource>): IOrderedEnumerable<TSource> => {
    return OrderedEnumerable.generate<TSource, TSource>(source, (x: TSource) => x, true, comparer)
}
