import { IEqualityComparer } from "../../types/IEqualityComparer";
export declare function contains<TSource>(source: Iterable<TSource>, value: TSource, comparer?: IEqualityComparer<TSource>): boolean;
