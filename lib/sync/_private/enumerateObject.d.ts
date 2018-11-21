import { IEnumerable, ITuple } from "../../types";
export declare function enumerateObject<TInput>(source: TInput): IEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>>;
