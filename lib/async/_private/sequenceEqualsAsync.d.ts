import { IAsyncEqualityComparer } from "../../shared/IAsyncEqualityComparer";
export declare function sequenceEqualsAsync<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
