import { fromAsync } from "../../async/static/fromAsync"
import type { IParallelEnumerable } from "../../types"

export const asAsync = <TSource>(source: IParallelEnumerable<TSource>) => {
    async function* generator() {
        for await (const value of source) {
            yield value
        }
    }
    return fromAsync(generator)
}
