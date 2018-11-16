import { IEqualityComparer } from "../../shared/IEqualityComparer";
import { IEnumerable } from "../IEnumerable";
export declare function distinct<TSource>(source: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
