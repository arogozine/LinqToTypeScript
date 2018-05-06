import { IComparer } from "../shared/shared";
import { KeySelector, KeySelectorAsync } from "../types/KeySelector";
import { IAsyncEnumerable } from "./IAsyncEnumerable";
export interface IOrderedAsyncEnumerable<TSource> extends IAsyncEnumerable<TSource> {
    thenBy(keySelector: KeySelector<TSource>, comparer?: IComparer<number | string>): IOrderedAsyncEnumerable<TSource>;
    thenByAsync(keySelector: KeySelectorAsync<TSource>, comparer?: IComparer<number | string>): IOrderedAsyncEnumerable<TSource>;
    thenByDescending(keySelector: KeySelector<TSource>, comparer?: IComparer<number | string>): IOrderedAsyncEnumerable<TSource>;
    thenByDescendingAsync(keySelector: KeySelectorAsync<TSource>, comparer?: IComparer<number | string>): IOrderedAsyncEnumerable<TSource>;
}
