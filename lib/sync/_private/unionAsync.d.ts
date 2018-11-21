import { IAsyncEqualityComparer } from "../../types/IAsyncEqualityComparer";
export declare function unionAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): import("../../types/IAsyncEnumerable").IAsyncEnumerable<TSource>;
