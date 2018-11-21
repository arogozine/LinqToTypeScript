import { IAsyncEqualityComparer } from "../../types/IAsyncEqualityComparer";
export declare function containsAsync<TSource>(source: Iterable<TSource>, value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
