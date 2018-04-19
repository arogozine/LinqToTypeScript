import { ArrayEnumerable } from "./ArrayEnumerable";
/**
 * Key to Values Enumeration
 */
export declare class Grouping<TKey, TElement> extends ArrayEnumerable<TElement> {
    readonly key: TKey;
    constructor(key: TKey, startingItem: TElement);
}
