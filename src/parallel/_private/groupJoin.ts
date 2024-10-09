import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { type IEqualityComparer, type IParallelEnumerable, ParallelGeneratorType } from "../../types"

export const groupJoin = <TOuter, TInner, TKey, TResult>(
    outer: IParallelEnumerable<TOuter>,
    inner: Iterable<TInner> | AsyncIterable<TInner>,
    outerKeySelector: (value: TOuter) => TKey,
    innerKeySelector: (value: TInner) => TKey,
    resultSelector: (element: TOuter, collection: TInner[]) => TResult,
    comparer?: IEqualityComparer<TKey>
    ) => {
    const generator = comparer ?
        groupJoinWithComparer(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer) :
        groupJoinSimple(outer, inner, outerKeySelector, innerKeySelector, resultSelector)

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray
    })
}

const groupJoinWithComparer = <TOuter, TInner, TKey, TResult>(
    outer: IParallelEnumerable<TOuter>,
    inner: Iterable<TInner> | AsyncIterable<TInner>,
    outerKeySelector: (value: TOuter) => TKey,
    innerKeySelector: (value: TInner) => TKey,
    resultSelector: (element: TOuter, collection: TInner[]) => TResult,
    comparer: IEqualityComparer<TKey>
    ) => {
    return async () => {
        const innerKeyMap: { key: TKey; values: TInner[] }[] = []
        for await (const innerValue of inner) {
            const key = innerKeySelector(innerValue)
            const record = innerKeyMap.find(x => comparer(x.key, key))
            if (record) {
                record.values.push(innerValue)
            }
            else {
                innerKeyMap.push({ key, values: [innerValue] })
            }
        }

        const outerValues = await outer.toArray()

        return outerValues
            .map(outerValue => {
                const key = outerKeySelector(outerValue)
                const innerRecord = innerKeyMap.find(x => comparer(x.key, key)) ?? { key, values: [] }
                return resultSelector(outerValue, innerRecord.values)
            })
    }
}

const groupJoinSimple = <TOuter, TInner, TKey, TResult>(
    outer: IParallelEnumerable<TOuter>,
    inner: Iterable<TInner> | AsyncIterable<TInner>,
    outerKeySelector: (value: TOuter) => TKey,
    innerKeySelector: (value: TInner) => TKey,
    resultSelector: (element: TOuter, collection: TInner[]) => TResult
) => {
    return async () => {
        const innerKeyMap = new Map<TKey, TInner[]>()
        for await (const innerValue of inner) {
            const key = innerKeySelector(innerValue)
            const values = innerKeyMap.get(key)
            if (values) {
                values.push(innerValue)
            }
            else {
                innerKeyMap.set(key, [innerValue])
            }
        }

        const outerValues = await outer.toArray()

        return outerValues
            .map(outerValue => {
                const key = outerKeySelector(outerValue)
                const values = innerKeyMap.get(key) ?? []
                return resultSelector(outerValue, values)
            })
    }
}