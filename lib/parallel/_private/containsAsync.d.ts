import { IAsyncEqualityComparer, IParallelEnumerable } from "../../types";
export declare function containsAsync<TSource>(source: IParallelEnumerable<TSource>, value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
