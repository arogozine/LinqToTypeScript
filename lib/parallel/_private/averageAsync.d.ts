import { IParallelEnumerable } from "../../types";
export declare function averageAsync<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
