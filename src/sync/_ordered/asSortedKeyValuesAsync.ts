import { IComparer } from "../../types"
import { asKeyMapAsync } from "./asKeyMapAsync"

/**
 * Sorts values in an Iterable based on key and a key comparer.
 * @param source Iterable
 * @param keySelector Async Key Selector
 * @param ascending Ascending or Descending Sort
 * @param comparer Key Comparer for Sorting. Optional.
 * @returns Async Iterable Iterator
 */
export async function *asSortedKeyValuesAsync<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    ascending: boolean,
    comparer?: IComparer<TKey>) {
    const map = await asKeyMapAsync(source, keySelector)
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
