import { IParallelEnumerable } from "../../types";
export declare function first<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
