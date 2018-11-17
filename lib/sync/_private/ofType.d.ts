import { InferType, OfType } from "../../shared/InferType";
import { IEnumerable } from "../IEnumerable";
export declare function ofType<TSource, TType extends OfType>(source: Iterable<TSource>, type: TType): IEnumerable<InferType<TType>>;
