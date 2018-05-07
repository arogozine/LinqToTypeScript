import { IComparer } from "../shared/shared"
import { InferKey, InferKeyAsync } from "../types/InferKeyAsync"
import { KeySelector, KeySelectorAsync } from "../types/KeySelector"
import { IParallelEnumerable } from "./IParallelEnumerable"

export interface IOrderedParallelEnumerable<TSource> extends IParallelEnumerable<TSource> {
    thenBy(
        keySelector: KeySelector<TSource>,
        comparer?: IComparer<InferKey<typeof keySelector>>): IOrderedParallelEnumerable<TSource>
    thenByAsync(
        keySelector: KeySelectorAsync<TSource>,
        comparer?: IComparer<InferKeyAsync<typeof keySelector>>): IOrderedParallelEnumerable<TSource>
    thenByDescending(
        keySelector: KeySelector<TSource>,
        comparer?: IComparer<InferKey<typeof keySelector>>): IOrderedParallelEnumerable<TSource>
    thenByDescendingAsync(
        keySelector: KeySelectorAsync<TSource>,
        comparer?: IComparer<InferKeyAsync<typeof keySelector>>): IOrderedParallelEnumerable<TSource>
}
