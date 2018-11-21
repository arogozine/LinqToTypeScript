import { IParallelEnumerable } from "../../parallel/IParallelEnumerable";
export declare function asParallel<TSource>(source: AsyncIterable<TSource>): IParallelEnumerable<TSource>;
