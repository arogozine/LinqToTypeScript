import { IComparer } from "../../shared/IComparer";
import { IEnumerable } from "../IEnumerable";
import { IOrderedEnumerable } from "../IOrderedEnumerable";
export declare function orderBy<TSource, TKey>(source: IEnumerable<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedEnumerable<TSource>;
