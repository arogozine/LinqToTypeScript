import { ArrayEnumerable } from "./ArrayEnumerable";
export declare class Grouping<TKey, TElement> extends ArrayEnumerable<TElement> {
    readonly key: TKey;
    constructor(key: TKey, startingItem: TElement);
}
