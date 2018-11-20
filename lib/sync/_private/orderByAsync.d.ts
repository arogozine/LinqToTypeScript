import { IOrderedAsyncEnumerable } from "../../async/IOrderedAsyncEnumerable";
import { IComparer } from "../../shared/IComparer";
import { IEnumerable } from "../IEnumerable";
export declare function orderByAsync<TSource, TKey>(source: IEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
