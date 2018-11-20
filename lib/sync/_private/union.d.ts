import { IEqualityComparer } from "../../shared/IEqualityComparer";
import { IEnumerable } from "../IEnumerable";
export declare function union<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
