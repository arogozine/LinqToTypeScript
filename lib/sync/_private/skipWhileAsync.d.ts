import { IAsyncEnumerable } from "../../types";
/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An Iterable<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains the elements from the input sequence starting
 * at the first element in the linear series that does not pass the test specified by predicate.
 */
export declare function skipWhileAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
