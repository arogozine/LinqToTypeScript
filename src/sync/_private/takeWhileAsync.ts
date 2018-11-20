import { from } from "../../async/AsyncEnumerable"
import { IAsyncEnumerable } from "../../async/IAsyncEnumerable"

export function takeWhileAsync<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {

    if (predicate.length === 1) {
        return takeWhileAsync_1(source, predicate as (x: T) => Promise<boolean>)
    } else {
        return takeWhileAsync_2(source, predicate as (x: T, index: number) => Promise<boolean>)
    }
}

function takeWhileAsync_1<T>(
    source: Iterable<T>,
    predicate: (x: T) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* iterator() {
        for (const item of source) {
            if (await predicate(item)) {
                yield item
            } else {
                break
            }
        }
    }

    return from(iterator)
}

function takeWhileAsync_2<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* iterator() {
        let index = 0
        for (const item of source) {
            if (await predicate(item, index++)) {
                yield item
            } else {
                break
            }
        }
    }

    return from(iterator)
}
