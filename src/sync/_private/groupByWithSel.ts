import { IEnumerable, IEqualityComparer, IGrouping, SelectorKeyType } from "../../types"
import { groupBy_1, groupBy_1_Simple } from "./groupByShared"

export type GroupByWithSelFunc = {
    /**
     * Groups the elements of a sequence according to a specified key selector function and
     * projects the elements for each group by using a specified function.
     * @param source An Iterable<T> whose elements to group.
     * @param keySelector A function to extract the key for each element.
     * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
     * @returns An IEnumerable<IGrouping<TKey, TElement>>
     * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
     */
    <TSource, TKey extends SelectorKeyType, TElement>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<TKey, TElement>>
    /**
     * Groups the elements of a sequence according to a key selector function.
     * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
     * @param source An Iterable<T> whose elements to group.
     * @param keySelector A function to extract the key for each element.
     * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
     * @param comparer An IEqualityComparer<T> to compare keys.
     * @returns An IEnumerable<IGrouping<TKey,TElement>>
     * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
     */
    <TSource, TKey, TElement>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>
}

export const groupByWithSel = <TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<ReturnType<typeof keySelector>, TElement>> => {

    if (comparer) {
        return groupBy_1(source,
            keySelector as (x: TSource) => TKey, elementSelector, comparer)
    } else {
        return groupBy_1_Simple(source,
            keySelector as (x: TSource) => number | string, elementSelector)
    }
}
