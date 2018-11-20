import { IAsyncEqualityComparer } from "../../shared/IAsyncEqualityComparer";
export declare function unionAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): import("../../async/IAsyncEnumerable").IAsyncEnumerable<TSource>;
