import { IEnumerable } from "../../types";
/**
 * Iterates through the object
 * @param source Source Object
 */
export declare function enumerateObject<TInput>(source: TInput): IEnumerable<[keyof TInput, TInput[keyof TInput]]>;
