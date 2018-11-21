import { IComparer } from "../../types/IComparer";
import { IEnumerable } from "../../types/IEnumerable";
import { IOrderedEnumerable } from "../../types/IOrderedEnumerable";
export declare function orderByDescending<TSource, TKey>(source: IEnumerable<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedEnumerable<TSource>;
