import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector An async transform function to apply to each element.
 * @returns An IAsyncEnumerable<T> whose elements are the result of invoking
 * the transform function on each element of source.
 */
export function selectAsync<TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param key A key of the elements in the sequence
 * @returns An IAsyncEnumerable<T> whoe elements are the result of getting the value for key
 * on each element of source.
 */
export function selectAsync<TSource extends { [key: string]: Promise<any> }, TKey extends keyof TSource>(
    source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
export function selectAsync<TSource extends { [key: string]: Promise<TResult> }, TKey extends keyof TSource, TResult>(
    source: AsyncIterable<TSource>,
    selector: ((x: TSource) => Promise<TResult>) | TKey): IAsyncEnumerable<any> {

    if (typeof selector === "string") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return selectAsync2(source, selector)
    } else {
        return selectAsync1(source, selector as (x: TSource) => Promise<TResult>)
    }
}

const selectAsync1 = <TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult> => {
    async function* iterator() {
        for await (const value of source) {
            yield selector(value)
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

const selectAsync2 = <
    TSource extends { [ key: string]: Promise<TResult> },
    TKey extends keyof TSource, TResult>(
    source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TResult> => {
    async function* iterator() {
        for await (const value of source) {
            yield value[key]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
