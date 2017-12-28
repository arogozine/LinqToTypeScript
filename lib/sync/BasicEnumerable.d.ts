import { BaseEnumerable } from "./BaseEnumerable";
export declare class BasicEnumerable<TSource> extends BaseEnumerable<TSource> {
    private readonly iterator;
    constructor(iterator: () => IterableIterator<TSource>);
    [Symbol.iterator](): IterableIterator<TSource>;
}
