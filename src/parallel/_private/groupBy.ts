import { Grouping } from "../../sync/Grouping"
import { type IAsyncParallel, type IEqualityComparer, type IGrouping, type IParallelEnumerable,
    ParallelGeneratorType, type SelectorKeyType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

type GroupByFunc = {
    <TSource, TKey extends SelectorKeyType>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => TKey): IParallelEnumerable<IGrouping<TKey, TSource>>
    <TSource, TKey>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>
}


export const groupBy: GroupByFunc = <TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>> => {

    if (comparer) {
        return groupBy_0<TSource, TKey>(source,
            keySelector as (x: TSource) => TKey, comparer)
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return groupBy_0_Simple(source,
            keySelector as (x: TSource) => any)
    }
}

const groupBy_0_Simple = <TSource, TKey extends SelectorKeyType>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey):
        IParallelEnumerable<IGrouping<TKey, TSource>> => {

    const generator = async () => {
        const keyMap: {[key: string]: Grouping<TKey, TSource>} = {}
        for (const value of await source.toArray()) {

            const key = keySelector(value)
            const grouping: Grouping<TKey, TSource> = keyMap[key] // TODO

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

const groupBy_0 = <TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>> => {

    const generator = async () => {

        const keyMap = new Array<Grouping<TKey, TSource>>()

        for (const value of await source.toArray()) {
            const key = keySelector(value)
            let found = false

            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i]
                if (comparer(group.key, key)) {
                    group.push(value)
                    found = true
                    break
                }
            }

            if (found === false) {
                keyMap.push(new Grouping<TKey, TSource>(key, value))
            }

        }

        const results = new Array<Grouping<TKey, TSource>>()
        for (const g of keyMap) {
            results.push(g)
        }
        return results as IGrouping<TKey, TSource>[]
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
