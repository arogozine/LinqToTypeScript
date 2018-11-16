import { IEqualityComparer } from "../../shared/IEqualityComparer";
import { IEnumerable } from "../IEnumerable";
export declare function intersect<TSource>(first: IEnumerable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
