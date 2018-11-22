import { IParallelEnumerable } from "../../types";
export declare function allAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
