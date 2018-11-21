import { IAsyncEnumerable } from "../../types";
export declare function skipWhileAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
