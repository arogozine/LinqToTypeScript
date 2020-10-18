import { IEnumerable } from "../types"

/* eslint-disable @typescript-eslint/naming-convention */

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

/**
 * Work around for lack of good support for circular module references in JS.
 * private Use @see {IEnumerable} instead
 */
export interface BasicEnumerable<TSource> extends IEnumerable<TSource> {

}
