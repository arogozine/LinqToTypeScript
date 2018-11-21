import { IAsyncEnumerable, IAsyncEqualityComparer } from "../../types";
export declare function distinctAsync<TSource>(source: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
