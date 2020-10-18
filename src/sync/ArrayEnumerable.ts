import { IEnumerable } from "../types"

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
export interface ArrayEnumerable<TSource> extends IEnumerable<TSource> {
    reverse(): ArrayEnumerable<TSource>
    concat(items: IEnumerable<TSource>): IEnumerable<TSource>
    concat(...items: ReadonlyArray<TSource>[]): ArrayEnumerable<TSource>
    // eslint-disable-next-line @typescript-eslint/array-type
    concat(...items: Array<TSource | ReadonlyArray<TSource>>): ArrayEnumerable<TSource>
}
