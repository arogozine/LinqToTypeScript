import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"
import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Converts the input array of promises to an async iterable
 * @param promises Array of Promises to Convert to an IAsyncEnumerable<T>
 * @throws {InvalidOperationException} No Elements in the Promises Array
 * @returns IAsyncEnumerable<T>
 */
export function from<TSource>(promises: Promise<TSource>[]): IAsyncEnumerable<TSource>
/**
 * Converts the input method to an async iterable
 * @param asyncIterable Function which returns an AsyncIterableIterator<TSource>
 * @returns IAsyncEnumerable<T>
 */
export function from<TSource>(asyncIterable: () => AsyncIterableIterator<TSource>): IAsyncEnumerable<TSource>
export function from<TSource>(promisesOrIterable: Promise<TSource>[] | (() => AsyncIterableIterator<TSource>)) {
    if (Array.isArray(promisesOrIterable)) {
        if (promisesOrIterable.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return new BasicAsyncEnumerable(async function*() {
            for await (const value of promisesOrIterable) {
                yield value
            }
        })
    } else {
        return new BasicAsyncEnumerable(promisesOrIterable)
    }
}
