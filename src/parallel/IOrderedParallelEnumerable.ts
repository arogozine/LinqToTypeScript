import { IComparer } from "../shared/shared"
import { KeySelector, KeySelectorAsync } from "../types/KeySelector"
import { IParallelEnumerable } from "./IParallelEnumerable"

export interface IOrderedParallelEnumerable<TSource> extends IParallelEnumerable<TSource> {
    thenBy(
        keySelector: KeySelector<TSource>,
        comparer?: IComparer<number | string>): IOrderedParallelEnumerable<TSource>
    thenByAsync(
        keySelector: KeySelectorAsync<TSource>,
        comparer?: IComparer<number | string>): IOrderedParallelEnumerable<TSource>
    thenByDescending(
        keySelector: KeySelector<TSource>,
        comparer?: IComparer<number | string>): IOrderedParallelEnumerable<TSource>
    thenByDescendingAsync(
        keySelector: KeySelectorAsync<TSource>,
        comparer?: IComparer<number | string>): IOrderedParallelEnumerable<TSource>
}
