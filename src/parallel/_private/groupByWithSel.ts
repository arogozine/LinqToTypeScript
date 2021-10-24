import { Grouping } from "../../sync/Grouping"
import { IAsyncParallel, IEqualityComparer, IGrouping,
    IParallelEnumerable, ParallelGeneratorType, SelectorKeyType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

type GroupByWithSelFunc = {
    /**
     * Groups the elements of a sequence according to a specified key selector function and
     * projects the elements for each group by using a specified function.
     * @param source An AsyncIterable<T> whose elements to group.
     * @param keySelector A function to extract the key for each element.
     * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
     * @returns An IParallelEnumerable<IGrouping<TKey, TElement>>
     * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
     */
    <TSource, TKey extends SelectorKeyType, TElement>(
        source: IAsyncParallel<TSource>,
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<TKey, TElement>>
    /**
     * Groups the elements of a sequence according to a key selector function.
     * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
     * @param source An AsyncIterable<T> whose elements to group.
     * @param keySelector A function to extract the key for each element.
     * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
     * @param comparer An IEqualityComparer<T> to compare keys.
     * @returns An IParallelEnumerable<IGrouping<TKey,TElement>>
     * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
     */
    <TSource, TKey, TElement>(
        source: IAsyncParallel<TSource>,
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>
}

export const groupByWithSel: GroupByWithSelFunc = <TSource, TKey, TElement>(
    source: IAsyncParallel<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<any, TElement>> => {

    if (comparer) {
        return groupBy1(source,
            keySelector as (x: TSource) => TKey, elementSelector, comparer)
    } else {
        return groupBy1Simple(source,
            keySelector as (x: TSource) => number | string, elementSelector)
    }
}

const groupBy1 = <TSource, TKey, TElement>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement,
    comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>> => {

    const generator = async () => {
        const keyMap = new Array<Grouping<TKey, TElement>>()
        for await (const value of source) {
            const key = keySelector(value)
            let found = false

            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i]
                if (comparer(group.key, key)) {
                    group.push(elementSelector(value))
                    found = true
                    break
                }
            }

            if (found === false) {
                const element = elementSelector(value)
                keyMap.push(new Grouping<TKey, TElement>(key, element))
            }

        }

        const results = new Array<IGrouping<TKey, TElement>>()
        for (const value of keyMap) {
            results.push(value)
        }
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

const groupBy1Simple = <TSource, TElement>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => string | number,
    elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string | number, TElement>> => {

    // generate(): AsyncIterableIterator<IGrouping<string | number, TElement>>
    const generator = async () => {
        const keyMap: { [key: string]: Grouping<string | number, TElement> } = {}
        for (const value of await source.toArray()) {

            const key = keySelector(value)
            const grouping: Grouping<string | number, TElement> = keyMap[key]
            const element = elementSelector(value)

            if (grouping) {
                grouping.push(element)
            } else {
                keyMap[key] = new Grouping<string | number, TElement>(key, element)
            }
        }

        /* eslint-disable guard-for-in */
        const results = new Array<IGrouping<string | number, TElement>>()
        for (const value in keyMap) {
            results.push(keyMap[value])
        }
        /* eslint-enable guard-for-in */
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
