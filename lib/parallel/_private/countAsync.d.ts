import { IParallelEnumerable } from "../../types";
export declare function countAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<number>;
