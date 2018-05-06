import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable"
import { IComparer } from "../shared/shared"
import { InferKey, InferKeyAsync } from "../types/InferKeyAsync"
import { KeySelector, KeySelectorAsync } from "../types/KeySelector"
import { IEnumerable } from "./IEnumerable"

export interface IOrderedEnumerable<TSource> extends IEnumerable<TSource> {
    thenBy(
        keySelector: KeySelector<TSource>,
        comparer?: IComparer<InferKey<typeof keySelector>>): IOrderedEnumerable<TSource>
    thenByAsync(
        keySelector: KeySelectorAsync<TSource>,
        comparer?: IComparer<InferKeyAsync<typeof keySelector>>): IOrderedAsyncEnumerable<TSource>
    thenByDescending(
        keySelector: KeySelector<TSource>,
        comparer?: IComparer<InferKey<typeof keySelector>>): IOrderedEnumerable<TSource>
    thenByDescendingAsync(
        keySelector: KeySelectorAsync<TSource>,
        comparer?: IComparer<InferKeyAsync<typeof keySelector>>): IOrderedAsyncEnumerable<TSource>
}
