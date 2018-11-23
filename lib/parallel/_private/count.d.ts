import { IParallelEnumerable } from "../../types";
export declare function count<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<number>;
export declare function count_2<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => boolean): Promise<number>;
