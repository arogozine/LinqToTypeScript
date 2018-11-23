import { IParallelEnumerable } from "../../types";
export declare function lastAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
