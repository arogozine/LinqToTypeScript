import { IParallelEnumerable } from "../../types";
export declare function all<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => boolean): Promise<boolean>;
