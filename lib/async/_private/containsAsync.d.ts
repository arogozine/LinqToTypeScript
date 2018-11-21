import { IAsyncEqualityComparer } from "../../types/IAsyncEqualityComparer";
export declare function containsAsync<TSource>(source: AsyncIterable<TSource>, value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
