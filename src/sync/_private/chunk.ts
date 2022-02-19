import { BasicEnumerable } from "../BasicEnumerable"
import { ArgumentOutOfRangeException } from "../../shared"
import type { IEnumerable } from "../../types"

export const chunk = <TSource>(source: Iterable<TSource>, size: number): IEnumerable<TSource[]> => {
    if (size < 1) {
        throw new ArgumentOutOfRangeException("index")
    }

    function* iterator() {
        let yieldChunk = []
        for (const value of source) {
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

    return new BasicEnumerable(iterator)
}