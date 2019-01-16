import { IAsyncEnumerable } from "../../types";
/**
 * Iterates through the object
 * @param source Source Object
 * @returns IAsyncEnumerabe<[TKey, TValue]> of Key Value pairs
 */
export declare function enumerateObject<TInput>(source: TInput): IAsyncEnumerable<[keyof TInput, TInput[keyof TInput]]>;
