import { IAsyncEnumerable } from "../../async/IAsyncEnumerable";
import { IAsyncEqualityComparer } from "../../shared/IAsyncEqualityComparer";
import { IEnumerable } from "../IEnumerable";
export declare function intersectAsync<TSource>(first: IEnumerable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
