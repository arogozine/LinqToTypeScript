import { IParallelEnumerable, TypedData } from "../../types";
/**
 * @private Don't use directly.
 */
export declare function nextIteration<TSource, TOut>(source: IParallelEnumerable<TSource>, onfulfilled: (x: TSource) => TOut): TypedData<TOut>;
