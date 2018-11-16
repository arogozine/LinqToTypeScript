import { IAsyncEnumerable } from "../../async/IAsyncEnumerable";
export declare function selectManyAsync<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => Promise<Iterable<TResult>>): IAsyncEnumerable<TResult>;
