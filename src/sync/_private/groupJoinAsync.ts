import { fromAsync } from "../../async/static/fromAsync"
import type { IEqualityComparer } from "../../types"

export const groupJoinAsync = <TOuter, TInner, TKey, TResult>(
    outer: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerKeySelector: (value: TOuter) => TKey,
    innerKeySelector: (value: TInner) => TKey,
    resultSelector: (element: TOuter, collection: TInner[]) => TResult,
    comparer?: IEqualityComparer<TKey>
    ) => {
    const generator = comparer ?
        groupJoinWithComparer(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer) :
        groupJoinSimple(outer, inner, outerKeySelector, innerKeySelector, resultSelector)

    return fromAsync(generator)
}

const groupJoinWithComparer = <TOuter, TInner, TKey, TResult>(
    outer: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerKeySelector: (value: TOuter) => TKey | Promise<TKey>,
    innerKeySelector: (value: TInner) => TKey | Promise<TKey>,
    resultSelector: (element: TOuter, collection: TInner[]) => TResult | Promise<TResult>,
    comparer: IEqualityComparer<TKey>
    ) => {
    return async function*(): AsyncIterableIterator<TResult> {
        const innerKeyMap: { key: TKey; values: TInner[] }[] = []
        for (const innerValue of inner) {
            const key = await innerKeySelector(innerValue)
            const record = innerKeyMap.find(x => comparer(x.key, key))
            if (record) {
                record.values.push(innerValue)
            }
            else {
                innerKeyMap.push({ key, values: [innerValue] })
            }
        }

        for (const outerValue of outer) {
            const key = await outerKeySelector(outerValue)
            const innerRecord = innerKeyMap.find(x => comparer(x.key, key)) ?? { key, values: [] }
            yield resultSelector(outerValue, innerRecord.values)
        }
    }
}

const groupJoinSimple = <TOuter, TInner, TKey, TResult>(
    outer: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerKeySelector: (value: TOuter) => TKey | Promise<TKey>,
    innerKeySelector: (value: TInner) => TKey | Promise<TKey>,
    resultSelector: (element: TOuter, collection: TInner[]) => TResult | Promise<TResult>
) => {
    return async function*(): AsyncIterableIterator<TResult> {
        const innerKeyMap = new Map<TKey, TInner[]>()
        for (const innerValue of inner) {
            const key = await innerKeySelector(innerValue)
            const values = innerKeyMap.get(key)
            if (values) {
                values.push(innerValue)
            }
            else {
                innerKeyMap.set(key, [innerValue])
            }
        }

        for (const outerValue of outer) {
            const key = await outerKeySelector(outerValue)
            const values = innerKeyMap.get(key) ?? []
            yield resultSelector(outerValue, values)
        }
    }
}