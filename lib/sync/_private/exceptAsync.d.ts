import { IAsyncEnumerable } from "../../async/IAsyncEnumerable";
import { IAsyncEqualityComparer } from "../../shared/IAsyncEqualityComparer";
export declare function exceptAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
