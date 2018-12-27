import { IParallelEnumerable, TypedData } from "../../types";
export declare function nextIterationWithIndexAsync<TSource, TOut>(source: IParallelEnumerable<TSource>, onfulfilled: (x: TSource, index: number) => Promise<TOut>): TypedData<TOut>;
