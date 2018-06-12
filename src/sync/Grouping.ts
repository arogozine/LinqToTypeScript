import { IGrouping } from "../shared/shared"
import { ArrayEnumerable } from "./ArrayEnumerable"

/**
 * Key to Values Enumeration
 * @private
 */
export class Grouping<TKey, TElement> extends ArrayEnumerable<TElement> implements IGrouping<TKey, TElement> {
    public readonly key: TKey
    constructor(key: TKey, startingItem: TElement) {
        super(1)
        this.key = key
        this[0] = startingItem
    }
}
