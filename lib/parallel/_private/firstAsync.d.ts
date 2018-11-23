import { IParallelEnumerable } from "../../types";
export declare function firstAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
