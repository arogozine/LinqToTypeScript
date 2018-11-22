import { IParallelEnumerable } from "../../types";
export declare function singleOrDefaultAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
