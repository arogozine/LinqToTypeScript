import { IParallelEnumerable } from "../../types";
export declare function lastOrDefaultAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
