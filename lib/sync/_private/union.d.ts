import { IEnumerable, IEqualityComparer } from "../../types";
export declare function union<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
