import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable"
import { IComparer } from "../shared/shared"
import { KeySelector, KeySelectorAsync } from "../types/KeySelector"
import { IEnumerable } from "./IEnumerable"

export interface IOrderedEnumerable<TSource> extends IEnumerable<TSource> {
    thenBy(
        keySelector: KeySelector<TSource>,
        comparer?: IComparer<string | number>): IOrderedEnumerable<TSource>
    thenByAsync(
        keySelector: KeySelectorAsync<TSource>,
        comparer?: IComparer<string | number>): IOrderedAsyncEnumerable<TSource>
    thenByDescending(
        keySelector: KeySelector<TSource>,
        comparer?: IComparer<string | number>): IOrderedEnumerable<TSource>
    thenByDescendingAsync(
        keySelector: KeySelectorAsync<TSource>,
        comparer?: IComparer<string | number>): IOrderedAsyncEnumerable<TSource>
}
