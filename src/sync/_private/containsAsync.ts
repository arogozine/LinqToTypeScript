import { IAsyncEqualityComparer } from "../../shared/IAsyncEqualityComparer"

export async function containsAsync<TSource>(
    source: Iterable<TSource>,
    value: TSource,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
    for (const item of source) {
        if (await comparer(value, item)) {
            return true
        }
    }

    return false
}
