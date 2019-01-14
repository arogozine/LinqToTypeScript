import { IEnumerable } from "../types"

/**
 * Basic Enumerable. Usually returned from the Enumerable class.
 * @private Use @see {IEnumerable} instead
 */
export class BasicEnumerable<TSource> {
    constructor(private readonly iterator: () => IterableIterator<TSource>) {
        //
    }

    public [Symbol.iterator](): IterableIterator<TSource> {
        return this.iterator()
    }
}

// tslint:disable-next-line:interface-name
export interface BasicEnumerable<TSource> extends IEnumerable<TSource> {

}
