import { IEqualityComparer } from "../../shared/IEqualityComparer";
export declare function contains<TSource>(source: Iterable<TSource>, value: TSource, comparer?: IEqualityComparer<TSource>): boolean;
