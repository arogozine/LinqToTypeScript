import { IAsyncEnumerable } from "../../async/IAsyncEnumerable";
export declare function skipWhileAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
