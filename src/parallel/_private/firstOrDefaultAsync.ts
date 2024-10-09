import type { IParallelEnumerable } from "../../types"
import { toArray } from "./toArray"

export const firstOrDefaultAsync = async <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> => {
    const data = await toArray(source)
    for (const value of data) {
        if (await predicate(value) === true) {
            return value
        }
    }

    return null
}
