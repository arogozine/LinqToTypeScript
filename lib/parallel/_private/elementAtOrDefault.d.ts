import { IParallelEnumerable } from "../../types";
export declare function elementAtOrDefault<TSource>(source: IParallelEnumerable<TSource>, index: number): Promise<TSource | null>;
