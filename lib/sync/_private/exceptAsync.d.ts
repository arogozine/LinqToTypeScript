import { IAsyncEnumerable, IAsyncEqualityComparer } from "../../types";
export declare function exceptAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
