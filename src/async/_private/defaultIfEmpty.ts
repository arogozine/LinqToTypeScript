import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const defaultIfEmpty = <TSource>(source: AsyncIterable<TSource>, defaultValue: TSource | Promise<TSource>): IAsyncEnumerable<TSource> => {
    async function* generator() {
        let found = false
        for await (const value of source) {
            found = true
            yield value
        }

        if (!found) {
            yield defaultValue
        }
    }

    return new BasicAsyncEnumerable(generator)
}