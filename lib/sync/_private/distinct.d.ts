import { IEnumerable, IEqualityComparer } from "../../types";
export declare function distinct<TSource>(source: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
