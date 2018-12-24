import { IParallelEnumerable, TypedData } from "../../types";
export declare function nextIterationWithIndex<TSource, TOut>(source: IParallelEnumerable<TSource>, onfulfilled: (x: TSource, index: number) => TOut): TypedData<TOut>;
