import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"
import { ArgumentOutOfRangeException } from "../../shared"
import type { IAsyncEnumerable } from "../../types"

export const chunk = <TSource>(source: AsyncIterable<TSource>, size: number): IAsyncEnumerable<TSource[]> => {
    if (size < 1) {
        throw new ArgumentOutOfRangeException("size")
    }

    async function* iterator() {
        let yieldChunk = []
        for await (const value of source) {
            yieldChunk.push(value)

            if (yieldChunk.length === size) {
                yield yieldChunk
                yieldChunk = []
            }
        }

        if (yieldChunk.length) {
            yield yieldChunk
        }
    }

    return new BasicAsyncEnumerable(iterator)
}