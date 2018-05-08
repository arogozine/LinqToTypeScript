import { IComparer } from "../shared/shared"
import { IParallelEnumerable } from "./IParallelEnumerable"

export interface IOrderedParallelEnumerable<TSource> extends IParallelEnumerable<TSource> {
    thenBy<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>
    thenByAsync<TKey>(
        keySelector: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>
    thenByDescending<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>
    thenByDescendingAsync<TKey>(
        keySelector: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>
}
