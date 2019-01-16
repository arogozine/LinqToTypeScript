import { IAsyncEnumerable, IAsyncFlatten } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Flattens an async iterable
 * @param source AsyncIterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export function flatten<TSource>(
    source: IAsyncFlatten<TSource>,
    shallow?: false): IAsyncEnumerable<TSource>
/**
 * Flattens an async iterable
 * @param source AsyncIterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export function flatten<TSource>(
    source: AsyncIterable<TSource | AsyncIterable<TSource>>,
    shallow: true): IAsyncEnumerable<TSource | AsyncIterable<TSource>>
export function flatten<TSource>(
    source: AsyncIterable<TSource | AsyncIterable<TSource>>,
    shallow?: boolean): IAsyncEnumerable<TSource | AsyncIterable<TSource>> {

    async function* iterator(sourceInner: AsyncIterable<any>)
        : AsyncIterableIterator<TSource | AsyncIterable<TSource>> {
        for await (const item of sourceInner) {
            if (item[Symbol.asyncIterator] !== undefined) {
                const items = shallow ? item : iterator(item as AsyncIterable<any>)
                for await (const inner of items) {
                    yield inner
                }
            } else {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(() => iterator(source))
}
