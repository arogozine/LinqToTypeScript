import { IAsyncEnumerable, IAsyncEqualityComparer, IEnumerable } from "../../types";
export declare function intersectAsync<TSource>(first: IEnumerable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
