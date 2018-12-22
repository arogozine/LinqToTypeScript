import { IEnumerable } from "../../types";
/**
 * Returns elements from a sequence as long as a specified condition is true.
 * The element's index is used in the logic of the predicate function.
 * @param source The sequence to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IEnumerable<T> that contains elements from the input sequence
 * that occur before the element at which the test no longer passes.
 */
export declare function takeWhile<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T>;
