import { IEqualityComparer } from "../../shared/IEqualityComparer";
export declare function sequenceEquals<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
