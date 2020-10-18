import { IEnumerable } from "../types"

/* eslint-disable @typescript-eslint/no-empty-interface */

/**
 * Basic Enumerable. Usually returned from the Enumerable class.
 * @private
 */
export class BasicEnumerable<TSource> {
    public constructor(private readonly iterator: () => IterableIterator<TSource>) {
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
