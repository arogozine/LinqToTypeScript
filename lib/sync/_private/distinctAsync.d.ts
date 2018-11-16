import { IAsyncEnumerable } from "../../async/IAsyncEnumerable";
import { IAsyncEqualityComparer } from "../../shared/IAsyncEqualityComparer";
export declare function distinctAsync<TSource>(source: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
