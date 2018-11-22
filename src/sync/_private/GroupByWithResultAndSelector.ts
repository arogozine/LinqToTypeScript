import { StrictEqualityComparer } from "../../shared/StrictEqualityComparer"
import { IEnumerable, IEqualityComparer } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"
import { groupBy_1, groupBy_1_Simple } from "./groupByShared"

export function GroupByWithResultAndSelector<TSource, TKey, TElement, TResult>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => string) | ((x: TSource) => number),
    elementSelector: (x: TSource) => TElement,
    resultSelector: ((key: TKey, values: IEnumerable<TElement>) => TResult) |
        ((key: string | number, values: IEnumerable<TElement>) => TResult),
    comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {
    if (comparer) {
        return groupBy_3(source,
            keySelector as (x: TSource) => TKey,
            elementSelector,
            resultSelector as (key: TKey, values: IEnumerable<TElement>) => TResult)
    } else {
        return groupBy_3_Simple(source,
            keySelector as ((x: TSource) => string) | ((x: TSource) => number),
            elementSelector,
            resultSelector as (key: string | number, values: IEnumerable<TElement>) => TResult)
    }
}

function groupBy_3_Simple<TSource, TElement, TResult>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => string) | ((x: TSource) => number),
    elementSelector: (x: TSource) => TElement,
    resultSelector: (key: string | number, values: IEnumerable<TElement>) => TResult): IEnumerable<TResult> {

    function *iterator(): IterableIterator<TResult> {
        const groupByResult = groupBy_1_Simple(source, keySelector, elementSelector)

        for (const group of groupByResult) {
            yield resultSelector(group.key, group)
        }
    }

    return new BasicEnumerable(iterator)
}

function groupBy_3<TSource, TKey, TElement, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement,
    resultSelector: (key: TKey, values: IEnumerable<TElement>) => TResult,
    comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IEnumerable<TResult> {

    function *iterator(): IterableIterator<TResult> {
        const groupByResult = groupBy_1(source, keySelector, elementSelector, comparer)

        for (const group of groupByResult) {
            yield resultSelector(group.key, group)
        }
    }

    return new BasicEnumerable(iterator)
}
