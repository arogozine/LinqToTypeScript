import { IEnumerable } from "../../types";
/**
 * Iterates through the object
 * @param source Source Object
 * @returns IEnumerabe<[TKey, TValue]> of Key Value pairs
 */
export declare function enumerateObject<TInput>(source: TInput): IEnumerable<[keyof TInput, TInput[keyof TInput]]>;
