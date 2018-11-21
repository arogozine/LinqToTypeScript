import { IEnumerable } from "../sync/sync"

/**
 * Represents a grouping based on a key
 */
export interface IGrouping<TKey, TElement> extends IEnumerable<TElement> {
    readonly key: TKey
}
