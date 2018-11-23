import { IParallelEnumerable } from "../../types";
export declare function firstOrDefault<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null>;
export declare function firstOrDefault_1<TSource>(source: IParallelEnumerable<TSource>): Promise<TSource | null>;
export declare function firstOrDefault_2<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => boolean): Promise<TSource | null>;
