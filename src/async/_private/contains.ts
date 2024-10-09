import { StrictEqualityComparer } from "../../shared"
import type { IEqualityComparer } from "../../types"

export const contains = async <TSource>(
    source: AsyncIterable<TSource>,
    value: TSource,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): Promise<boolean> => {

    for await (const item of source) {
        if (comparer(value, item)) {
            return true
        }
    }

    return false
}
