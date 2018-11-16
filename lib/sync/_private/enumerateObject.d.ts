import { ITuple } from "../../shared/ITuple";
import { IEnumerable } from "../IEnumerable";
export declare function enumerateObject<TInput>(source: TInput): IEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>>;
