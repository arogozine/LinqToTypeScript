import { IComparer } from "../shared/shared";
import { InferKey, InferKeyAsync } from "../types/InferKeyAsync";
import { KeySelector, KeySelectorAsync } from "../types/KeySelector";
import { IAsyncEnumerable } from "./IAsyncEnumerable";
export interface IOrderedAsyncEnumerable<TSource> extends IAsyncEnumerable<TSource> {
    thenBy(keySelector: KeySelector<TSource>, comparer?: IComparer<InferKey<typeof keySelector>>): IOrderedAsyncEnumerable<TSource>;
    thenByAsync(keySelector: KeySelectorAsync<TSource>, comparer?: IComparer<InferKeyAsync<typeof keySelector>>): IOrderedAsyncEnumerable<TSource>;
    thenByDescending(keySelector: KeySelector<TSource>, comparer?: IComparer<InferKey<typeof keySelector>>): IOrderedAsyncEnumerable<TSource>;
    thenByDescendingAsync(keySelector: KeySelectorAsync<TSource>, comparer?: IComparer<InferKeyAsync<typeof keySelector>>): IOrderedAsyncEnumerable<TSource>;
}
