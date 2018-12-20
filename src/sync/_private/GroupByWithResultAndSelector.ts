import { StrictEqualityComparer } from "../../shared/StrictEqualityComparer"
import { IEnumerable, IEqualityComparer, SelectorKeyType } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"
import { groupBy_1, groupBy_1_Simple } from "./groupByShared"

export function groupByWithResultAndSelector<TSource, TKey extends SelectorKeyType, TElement, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement,
    resultSelector: (key: TKey, values: IEnumerable<TElement>) => TResult,
    comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {
    if (comparer) {
        return groupBy3(source,
            keySelector as (x: TSource) => TKey,
            elementSelector,
            resultSelector)
    } else {
        return groupBy3Simple(source,
            keySelector,
            elementSelector,
            resultSelector)
    }
}

const groupBy3Simple = <TSource, TKey extends SelectorKeyType, TElement, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement,
    resultSelector: (key: TKey, values: IEnumerable<TElement>) => TResult) => {

    function *iterator(): IterableIterator<TResult> {
        const groupByResult = groupBy_1_Simple(source, keySelector, elementSelector)

        for (const group of groupByResult) {
            yield resultSelector(group.key, group)
        }
    }

    return new BasicEnumerable(iterator)
}

const groupBy3 = <TSource, TKey, TElement, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement,
    resultSelector: (key: TKey, values: IEnumerable<TElement>) => TResult,
    comparer: IEqualityComparer<TKey> = StrictEqualityComparer) => {

    function *iterator(): IterableIterator<TResult> {
        const groupByResult = groupBy_1(source, keySelector, elementSelector, comparer)

        for (const group of groupByResult) {
            yield resultSelector(group.key, group)
        }
    }

    return new BasicEnumerable(iterator)
}
