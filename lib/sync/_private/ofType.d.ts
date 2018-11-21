import { IEnumerable } from "../../types";
import { InferType, OfType } from "../../types/InferType";
export declare function ofType<TSource, TType extends OfType>(source: Iterable<TSource>, type: TType): IEnumerable<InferType<TType>>;
