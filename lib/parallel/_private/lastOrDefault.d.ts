import { IParallelEnumerable } from "../../types";
export declare function lastOrDefault<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null>;
