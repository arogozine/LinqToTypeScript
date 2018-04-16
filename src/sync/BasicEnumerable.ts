import { BaseEnumerable } from "./BaseEnumerable"

/**
 * Basic Enumerable. Usually returned from the Enumerable class.
 * @private Use @see {IEnumerable} instead
 */
export class BasicEnumerable<TSource> extends BaseEnumerable<TSource> {
    constructor(private readonly iterator: () => IterableIterator<TSource>) {
        super()
    }

    public [Symbol.iterator](): IterableIterator<TSource> {
        return this.iterator()
    }
}
