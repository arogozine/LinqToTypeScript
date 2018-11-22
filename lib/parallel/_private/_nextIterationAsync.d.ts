import { IParallelEnumerable, TypedData } from "../../types";
export declare function nextIterationAsync<TSource, TOut>(source: IParallelEnumerable<TSource>, onfulfilled: (x: TSource) => Promise<TOut>): TypedData<TOut>;
