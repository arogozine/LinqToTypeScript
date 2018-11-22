import { IGrouping } from "../types";
import { ArrayEnumerable } from "./ArrayEnumerable";
/**
 * Key to Values Enumeration
 * @private
 */
export declare class Grouping<TKey, TElement> extends ArrayEnumerable<TElement> implements IGrouping<TKey, TElement> {
    readonly key: TKey;
    constructor(key: TKey, startingItem: TElement);
}
