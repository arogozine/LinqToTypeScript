import { IParallelEnumerable } from "../../types";
export declare function any<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<boolean>;
