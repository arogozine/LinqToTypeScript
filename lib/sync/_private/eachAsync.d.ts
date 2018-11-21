import { IAsyncEnumerable } from "../../types";
export declare function eachAsync<TSource>(source: Iterable<TSource>, action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource>;
