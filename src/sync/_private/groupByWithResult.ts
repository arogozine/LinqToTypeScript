import { StrictEqualityComparer } from "../../shared/TypesAndHelpers"
import { IEnumerable, IEqualityComparer } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"
import { groupBy_0, groupBy_0_Simple } from "./groupByShared"

export function groupByWithResult<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => string,
    resultSelector: (x: string, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
export function groupByWithResult<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => string,
    resultSelector: (x: string, values: IEnumerable<TSource>) => TResult,
    comparer: IEqualityComparer<string>): IEnumerable<TResult>

export function groupByWithResult<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => number,
    resultSelector: (x: number, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
export function groupByWithResult<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => number,
    resultSelector: (x: number, values: IEnumerable<TSource>) => TResult,
    comparer: IEqualityComparer<number>): IEnumerable<TResult>

export function groupByWithResult<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
export function groupByWithResult<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => number,
    resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult,
    comparer: IEqualityComparer<TKey>): IEnumerable<TResult>

export function groupByWithResult<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => string) | ((x: TSource) => number),
    resultSelector: (x: string | number | TKey, values: IEnumerable<TSource>) => TResult,
    comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {

    if (comparer) {
        return groupBy_2<TSource, TKey, TResult>(source,
            keySelector as (x: TSource) => TKey,
            resultSelector,
            comparer)
    } else {
        return groupBy_2_Simple(source,
            keySelector as ((x: TSource) => string) | ((x: TSource) => number),
            resultSelector)
    }
}

export function groupBy_2_Simple<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => string) | ((x: TSource) => number),
    resultSelector: (x: string | number, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult> {

    function *iterator(): IterableIterator<TResult> {
        const groupByResult = groupBy_0_Simple(source, keySelector)

        for (const group of groupByResult) {
            yield resultSelector(group.key, group)
        }
    }

    return new BasicEnumerable(iterator)
}

export function groupBy_2<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult,
    comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IEnumerable<TResult> {

    function *iterator(): IterableIterator<TResult> {
        const groupByResult = groupBy_0(source, keySelector, comparer)

        for (const group of groupByResult) {
            yield resultSelector(group.key, group)
        }
    }

    return new BasicEnumerable(iterator)
}
