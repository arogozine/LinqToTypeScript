import { IGrouping } from "../shared/shared";
import { ArrayEnumerable } from "./ArrayEnumerable";
/**
 * Key to Values Enumeration
 */
export declare class Grouping<TKey, TElement> extends ArrayEnumerable<TElement> implements IGrouping<TKey, TElement> {
    readonly key: TKey;
    constructor(key: TKey, startingItem: TElement);
}
