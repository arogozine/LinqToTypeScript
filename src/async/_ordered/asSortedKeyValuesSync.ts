import type { IComparer } from "../../types"
import { asKeyMapSync } from "./asKeyMapSync"

/**
 * Sorts values in an Iterable based on key and a key comparer.
 * @param source Iterable
 * @param keySelector Key Selector
 * @param ascending Ascending or Descending Sort
 * @param comparer Key Comparer for Sorting. Optional.
 */
export function *asSortedKeyValuesSync<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    ascending: boolean,
    comparer?: IComparer<TKey>) {
    const map = asKeyMapSync(source, keySelector)
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
