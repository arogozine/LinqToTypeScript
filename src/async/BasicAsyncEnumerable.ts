import { IAsyncEnumerable } from "../types"

// tslint:disable:interface-name

/**
 * The class behind IAsyncEnumerable<T>
 * @private
 */
export class BasicAsyncEnumerable<TSource> {
    constructor(private readonly iterator: () => AsyncIterableIterator<TSource>) {
        //
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<TSource> {
        return this.iterator()
    }
}

/**
 * Workaround for circular reference issues in JS
 * @private
 */
export interface BasicAsyncEnumerable<TSource> extends IAsyncEnumerable<TSource> {

}
