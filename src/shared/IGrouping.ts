import { IEnumerable } from "../sync/sync"

export interface IGrouping<TKey, TElement> extends IEnumerable<TElement> {
    readonly key: TKey
}
