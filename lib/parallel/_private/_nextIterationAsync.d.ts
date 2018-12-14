import { IParallelEnumerable, TypedData } from "../../types";
/**
 * @private Next Iteration for Parallel Enumerable
 */
export declare function nextIterationAsync<TSource, TOut>(source: IParallelEnumerable<TSource>, onfulfilled: (x: TSource) => Promise<TOut>): TypedData<TOut>;
