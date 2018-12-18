import { IComparer } from "../../types"
import { asAsyncKeyMapSync } from "./asAsyncKeyMapSync"

export async function *asAsyncSortedKeyValuesSync<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    ascending: boolean,
    comparer?: IComparer<TKey>) {
    const map = await asAsyncKeyMapSync(source, keySelector)
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
