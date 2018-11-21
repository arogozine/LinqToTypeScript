import { IEnumerable, IEqualityComparer } from "../../types";
export declare function intersect<TSource>(first: IEnumerable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
