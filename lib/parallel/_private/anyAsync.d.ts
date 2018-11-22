import { IParallelEnumerable } from "../../types";
export declare function anyAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
