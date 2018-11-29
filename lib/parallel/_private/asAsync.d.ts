import { IAsyncEnumerable, IParallelEnumerable } from "../../types";
export declare function asAsync<TSource>(source: IParallelEnumerable<TSource>): IAsyncEnumerable<TSource>;
