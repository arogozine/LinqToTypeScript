import type { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const skip = <TSource>(source: AsyncIterable<TSource>, count: number): IAsyncEnumerable<TSource> => {

    async function* iterator() {
        let i = 0
        for await (const item of source) {
            if (i++ >= count) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
