import { IEqualityComparer } from "../../types";
export declare function contains<TSource>(source: AsyncIterable<TSource>, value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
