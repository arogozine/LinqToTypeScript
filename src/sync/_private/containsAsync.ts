import type { IAsyncEqualityComparer } from "../../types"

export const containsAsync = async <TSource>(
    source: Iterable<TSource>,
    value: TSource,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> => {
    for (const item of source) {
        if (await comparer(value, item)) {
            return true
        }
    }

    return false
}
