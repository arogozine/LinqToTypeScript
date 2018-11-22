import { IParallelEnumerable, TypedData } from "../../types";
export declare function nextIteration<TSource, TOut>(source: IParallelEnumerable<TSource>, onfulfilled: (x: TSource) => TOut): TypedData<TOut>;
