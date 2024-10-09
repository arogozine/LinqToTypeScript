import type { IEnumerable } from "../types"

/* eslint-disable @typescript-eslint/naming-convention */

/**
 * Array backed Enumerable
 */
export class ArrayEnumerable<TSource> extends Array<TSource> {
}

/**
 * Workaround
 * @private
 */
export interface ArrayEnumerable<TSource> extends Omit<IEnumerable<TSource>, typeof Symbol.iterator>  {
    reverse(): ArrayEnumerable<TSource>

}