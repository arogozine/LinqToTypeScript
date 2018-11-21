import { IAsyncEqualityComparer } from "../../shared/IAsyncEqualityComparer"

export async function containsAsync<TSource>(
    source: AsyncIterable<TSource>,
    value: TSource,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {

    for await (const item of source) {
        if (await comparer(value, item)) {
            return true
        }
    }

    return false
}
