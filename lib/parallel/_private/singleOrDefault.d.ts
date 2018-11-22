import { IParallelEnumerable } from "../../types";
export declare function singleOrDefault<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null>;
