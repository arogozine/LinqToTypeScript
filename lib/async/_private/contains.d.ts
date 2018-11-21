import { IEqualityComparer } from "../../shared/IEqualityComparer";
export declare function contains<TSource>(source: AsyncIterable<TSource>, value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
