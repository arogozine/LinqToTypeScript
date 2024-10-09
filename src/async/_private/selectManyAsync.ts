import type { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const selectManyAsync = <TSource, Y>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource, index: number) => Promise<Iterable<Y>>): IAsyncEnumerable<Y> => {
    if (selector.length === 1) {
        const iterator = async function*() {
            for await (const value of source) {
                const many = await (selector as (x: TSource) => Promise<Iterable<Y>>)(value)
                for (const innerValue of many) {
                    yield innerValue
                }
            }
        }

        return new BasicAsyncEnumerable(iterator)
    } else {
        const iterator = async function*() {
            let index = 0
            for await (const value of source) {
                const many = await selector(value, index)
                for (const innerValue of many) {
                    yield innerValue
                }
                index++
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }
}
