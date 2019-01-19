import { IAsyncParallel, InferType, IParallelEnumerable, OfType } from "../../types";
/**
 * Applies a type filter to a source iteration
 * @param source Async Iteration to Filtery by Type
 * @param type Either value for typeof or a consturctor function
 * @returns Values that match the type string or are instance of type
 */
export declare function ofType<TSource, TType extends OfType>(source: IAsyncParallel<TSource>, type: TType): IParallelEnumerable<InferType<TType>>;
