/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import type { IEnumerable } from "../types"

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