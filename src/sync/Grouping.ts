import { ArrayEnumerable } from "./ArrayEnumerable"

/**
 * Key to Values Enumeration
 */
export class Grouping<TKey, TElement> extends ArrayEnumerable<TElement> {
    public readonly key: TKey
    constructor(key: TKey, startingItem: TElement) {
        super(1)
        this.key = key
        this[0] = startingItem
    }
}
