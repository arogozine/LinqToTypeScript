import { IAsyncParallel } from "../../types"

export async function sumAsync<TSource>(
    source: IAsyncParallel<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> {
    let total = 0
    for (const value of await source.toArray()) {
        total += await selector(value)
    }

    return total
}
