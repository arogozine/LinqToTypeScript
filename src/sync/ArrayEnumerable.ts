import { IEnumerable } from "../types"

// tslint:disable:interface-name

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
    // tslint:disable-next-line: array-type
    concat(...items: Array<TSource | ReadonlyArray<TSource>>): ArrayEnumerable<TSource>
}
