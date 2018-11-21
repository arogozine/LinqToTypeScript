import { IAsyncEqualityComparer } from "../../types/IAsyncEqualityComparer";
export declare function sequenceEqualsAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
