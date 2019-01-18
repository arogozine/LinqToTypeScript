import { Grouping } from "../sync/sync"
import { IAsyncEqualityComparer,
    IAsyncParallel,
    IEqualityComparer,
    IGrouping,
    IParallelEnumerable,
    ParallelGeneratorType,
    SelectorKeyType} from "../types"
import { BasicParallelEnumerable } from "./BasicParallelEnumerable"

// tslint:disable:completed-docs

export function groupBy_0_Simple<TSource, TKey extends SelectorKeyType>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey):
        IParallelEnumerable<IGrouping<TKey, TSource>> {

    const generator = async () => {
        const keyMap: {[key: string]: Grouping<TKey, TSource>} = {}
        for (const value of await source.toArray()) {

            const key = keySelector(value)
            const grouping: Grouping<TKey, TSource> = keyMap[key]

            if (grouping) {
                grouping.push(value)
            } else {
                keyMap[key] = new Grouping<TKey, TSource>(key, value)
            }
        }

        const results = new Array<IGrouping<TKey, TSource>>()
        /* tslint:disable:forin */
        for (const value in keyMap) {
            results.push(keyMap[value])
        }
        /* tslint:enable:forin */
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function groupBy_0<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>> {

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
        return results as Array<IGrouping<TKey, TSource>>
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function groupByAsync_0_Simple<TSource, TKey extends SelectorKeyType>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => Promise<TKey>):
        IParallelEnumerable<IGrouping<TKey, TSource>> {

    const generator = async () => {
        const keyMap: {[key: string]: Grouping<TKey, TSource>} = {}
        for (const value of await source.toArray()) {

            const key = await keySelector(value)
            const grouping: Grouping<TKey, TSource> = keyMap[key]

            if (grouping) {
                grouping.push(value)
            } else {
                keyMap[key] = new Grouping<TKey, TSource>(key, value)
            }
        }

        const results = new Array<IGrouping<TKey, TSource>>()
        /* tslint:disable:forin */
        for (const value in keyMap) {
            results.push(keyMap[value])
        }
        /* tslint:enable:forin */
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function groupByAsync_0<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>)
        : IParallelEnumerable<IGrouping<TKey, TSource>> {

    const generator = async () => {
        const keyMap = new Array<Grouping<TKey, TSource>>()
        for await (const value of source) {
            const key = await keySelector(value)
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

export function groupBy_1_Simple<TSource, TElement>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => string | number,
    elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string | number, TElement>> {

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

        /* tslint:disable:forin */
        const results = new Array<IGrouping<string | number, TElement>>()
        for (const value in keyMap) {
            results.push(keyMap[value])
        }
        /* tslint:enable:forin */
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function groupBy_1<TSource, TKey, TElement>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement,
    comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>> {

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

export function repeat_1<T>(element: T, count: number): IParallelEnumerable<T> {
    const generator = async () => {
        const values = new Array<T>(count)
        for (let i = 0; i < count; i++) {
            values[i] = element
        }
        return values
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function repeat_2<T>(element: T, count: number, delay: number): IParallelEnumerable<T> {
    const generator = async () => {
        const values = new Array<Promise<T>>(count)
        for (let i = 0; i < count; i++) {
            values[i] = new Promise<T>((resolve) => setTimeout(() => resolve(element), delay))
        }
        return values
    }

    return new BasicParallelEnumerable<T>({
        generator,
        type: ParallelGeneratorType.PromiseOfPromises,
    })
}

export function union_1<TSource>(
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>) {

    async function generator() {

        const set = new Set<TSource>()
        const secondPromise = second.toArray()

        for await (const item of first) {
            if (set.has(item) === false) {
                set.add(item)
            }
        }

        const secondValues = await secondPromise
        for (const item of secondValues) {
            if (set.has(item) === false) {
                set.add(item)
            }
        }

        return [... set.keys()]
    }

    return new BasicParallelEnumerable<TSource>({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function union_2<TSource>(
    // tslint:disable-next-line:no-shadowed-variable
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>,
    comparer: IEqualityComparer<TSource>) {

    const generator = async () => {
        const result: TSource[] = []
        const values = await Promise.all([ first.toArray(), second.toArray() ])
        for (const source of values) {
            for (const value of source) {
                let exists = false

                for (const resultValue of result) {
                    if (comparer(value, resultValue) === true) {
                        exists = true
                        break
                    }
                }

                if (exists === false) {
                    result.push(value)
                }
            }
        }

        return result
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
