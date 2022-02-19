import { Grouping } from "../../sync/Grouping"
import { IAsyncEqualityComparer, IEqualityComparer,
    IGrouping, IParallelEnumerable, ParallelGeneratorType, SelectorKeyType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIterationAsync } from "./_nextIterationAsync"

type GroupByAsyncFunc = {
    <TSource, TKey extends SelectorKeyType>(
        source: IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<TKey> | TKey): IParallelEnumerable<IGrouping<TKey, TSource>>
    <TSource, TKey>(
        source: IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<TKey> | TKey,
        comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>
}


export const groupByAsync: GroupByAsyncFunc = <TSource, TKey>(
    source: IParallelEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>)
        : IParallelEnumerable<IGrouping<any, TSource>> => {

    if (comparer) {
        return groupByAsync_0<TSource, TKey>(source,
            keySelector, comparer)
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return groupByAsync_0_Simple(source,
            keySelector as (x: TSource) => any)
    }
}

const groupByAsync_0 = <TSource, TKey>(
    source: IParallelEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>)
        : IParallelEnumerable<IGrouping<TKey, TSource>> => {

    const generator = async () => {
        const typedData = nextIterationAsync(source, async (value) => {
            const key = await keySelector(value)
            return [key, value] as [TKey, TSource]
        })

        let values: [TKey, TSource][]

        switch (typedData.type) {
            case ParallelGeneratorType.ArrayOfPromises:
                values = await Promise.all(typedData.generator())
                break
            case ParallelGeneratorType.PromiseOfPromises:
                values = await Promise.all(await typedData.generator())
                break
        }

        const keyMap = new Array<Grouping<TKey, TSource>>()
        for (const [key, value] of values) {
            let found = false

            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i]
                if (await comparer(group.key, key) === true) {
                    group.push(value)
                    found = true
                    break
                }
            }

            if (found === false) {
                keyMap.push(new Grouping<TKey, TSource>(key, value))
            }
        }

        const results = new Array<IGrouping<TKey, TSource>>()
        for (const g of keyMap) {
            results.push(g)
        }

        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

const groupByAsync_0_Simple = <TSource, TKey extends SelectorKeyType>(
    source: IParallelEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>):
        IParallelEnumerable<IGrouping<TKey, TSource>> => {

    const generator = async () => {
        const typedData = nextIterationAsync(source, async (value) => {
            const key = await keySelector(value)
            return [key, value] as [TKey, TSource]
        })

        let values: [TKey, TSource][]

        switch (typedData.type) {
            case ParallelGeneratorType.ArrayOfPromises:
                values = await Promise.all(typedData.generator())
                break
            case ParallelGeneratorType.PromiseOfPromises:
                values = await Promise.all(await typedData.generator())
                break
        }

        const keyMap: {[key: string]: Grouping<TKey, TSource>} = {}
        for (const [key, value] of values) {
            const grouping: Grouping<TKey, TSource> = keyMap[key]

            if (grouping) {
                grouping.push(value)
            } else {
                keyMap[key] = new Grouping<TKey, TSource>(key, value)
            }
        }

        const results = new Array<IGrouping<TKey, TSource>>()
        /* eslint-disable guard-for-in */
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
