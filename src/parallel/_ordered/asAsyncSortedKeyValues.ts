import { IComparer } from "../../types"
import { asAsyncKeyMap } from "./asAsyncKeyMap"

export async function *asAsyncSortedKeyValues<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    ascending: boolean,
    comparer?: IComparer<TKey>) {
    const map = await asAsyncKeyMap(source, keySelector)

    const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined)

    if (ascending) {
        for (let i = 0; i < sortedKeys.length; i++) {
            yield map.get(sortedKeys[i]) as TSource[]
        }
    } else {
        for (let i = sortedKeys.length - 1; i >= 0; i--) {
            yield map.get(sortedKeys[i]) as TSource[]
        }
    }
}
