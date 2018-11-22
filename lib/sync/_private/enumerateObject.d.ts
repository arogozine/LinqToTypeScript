import { IEnumerable } from "../../types";
export declare function enumerateObject<TInput>(source: TInput): IEnumerable<[keyof TInput, TInput[keyof TInput]]>;
