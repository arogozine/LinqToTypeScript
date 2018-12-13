import { IEnumerable } from "../../types";
import { InferType, OfType } from "../../types/InferType";
/**
 * Applies a type filter to a source iteration
 * @param source Iteration to Filtery by Type
 * @param type Either value for typeof or a consturctor function
 * @returns Values that match the type string or are instance of type
 */
export declare function ofType<TSource, TType extends OfType>(source: Iterable<TSource>, type: TType): IEnumerable<InferType<TType>>;
