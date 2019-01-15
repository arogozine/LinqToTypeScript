import { IAsyncEnumerable } from "../types"

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

// tslint:disable-next-line:interface-name
export interface BasicAsyncEnumerable<TSource> extends IAsyncEnumerable<TSource> {

}
