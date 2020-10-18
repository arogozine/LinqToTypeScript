/* eslint-disable @typescript-eslint/no-empty-interface */

import { IAsyncEnumerable } from "../types"

/* eslint-disable @typescript-eslint/naming-convention */

/**
 * The class behind IAsyncEnumerable<T>
 * @private
 */
export class BasicAsyncEnumerable<TSource> {
    public constructor(private readonly iterator: () => AsyncIterableIterator<TSource>) {
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
