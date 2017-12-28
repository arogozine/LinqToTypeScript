import { BaseEnumerable } from "./BaseEnumerable"

export class BasicEnumerable<TSource> extends BaseEnumerable<TSource> {
    constructor(private readonly iterator: () => IterableIterator<TSource>) {
        super()
    }

    public [Symbol.iterator](): IterableIterator<TSource> {
        return this.iterator()
    }
}
