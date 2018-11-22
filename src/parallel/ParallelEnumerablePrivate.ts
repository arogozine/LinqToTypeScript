import {
    ErrorString,
    InvalidOperationException } from "../shared/shared"
import { Grouping } from "../sync/sync"
import { IAsyncEqualityComparer,
    IAsyncParallel,
    IEqualityComparer,
    IGrouping,
    IParallelEnumerable,
    ParallelGeneratorType } from "../types"
import { BasicParallelEnumerable } from "./BasicParallelEnumerable"

// tslint:disable:completed-docs

export async function count_1<TSource>(source: IParallelEnumerable<TSource>): Promise<number> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        case ParallelGeneratorType.PromiseOfPromises:
            const arrayData = await source.toArray()
            return arrayData.length
        case ParallelGeneratorType.ArrayOfPromises:
            const promises = dataFunc.generator()
            return promises.length
    }
}

export async function count_2<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<number> {
    const values = await source.toArray()
    let totalCount = 0
    for (let i = 0; i < values.length; i++) {
        if (predicate(values[i]) === true) {
            totalCount ++
        }
    }
    return totalCount
}

export async function first_1<TSource>(
    source: IParallelEnumerable<TSource>): Promise<TSource> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const values = await dataFunc.generator()
            if (values.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            } else {
                return values[0]
            }
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const promises = dataFunc.generator()
            if (promises.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            } else {
                return await promises[0]
            }
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const promises = await dataFunc.generator()
            if (promises.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            } else {
                return await promises[0]
            }
        }
    }
}

export async function first_2<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<TSource> {
    const data = await toArray(source)
    for (const value of data) {
        if (predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}

export async function firstOrDefault_1<TSource>(
    source: IParallelEnumerable<TSource>): Promise<TSource | null> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const values = await dataFunc.generator()
            if (values.length === 0) {
                return null
            } else {
                return values[0]
            }
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const promises = dataFunc.generator()
            if (promises.length === 0) {
                return null
            } else {
                return await promises[0]
            }
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const promises = await dataFunc.generator()
            if (promises.length === 0) {
                return null
            } else {
                return await promises[0]
            }
        }
    }
}

export async function firstOrDefault_2<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<TSource | null> {
    const data = await toArray(source)
    for (const value of data) {
        if (predicate(value) === true) {
            return value
        }
    }

    return null
}

export function groupBy_0_Simple<TSource>(
    source: IAsyncParallel<TSource>,
    keySelector: ((x: TSource) => string) | ((x: TSource) => number)):
        IParallelEnumerable<IGrouping<string | number, TSource>> {

    const generator = async () => {
        const keyMap: {[key: string]: Grouping<string | number, TSource>} = {}
        for (const value of await source.toArray()) {

            const key = keySelector(value)
            const grouping: Grouping<string | number, TSource> = keyMap[key]

            if (grouping) {
                grouping.push(value)
            } else {
                keyMap[key] = new Grouping<string | number, TSource>(key, value)
            }
        }

        const results = new Array<IGrouping<string | number, TSource>>()
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

export function groupByAsync_0_Simple<TSource>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => Promise<string>):
        IParallelEnumerable<IGrouping<string | number, TSource>> {

    const generator = async () => {
        const keyMap: {[key: string]: Grouping<string | number, TSource>} = {}
        for (const value of await source.toArray()) {

            const key = await keySelector(value)
            const grouping: Grouping<string | number, TSource> = keyMap[key]

            if (grouping) {
                grouping.push(value)
            } else {
                keyMap[key] = new Grouping<string | number, TSource>(key, value)
            }
        }

        const results = new Array<IGrouping<string | number, TSource>>()
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

export async function last_1<TSource>(
    source: IParallelEnumerable<TSource>): Promise<TSource> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const values = await dataFunc.generator()
            if (values.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            } else {
                return values[values.length - 1]
            }
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const promises = dataFunc.generator()
            if (promises.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            } else {
                return await promises[promises.length - 1]
            }
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const promises = await dataFunc.generator()
            if (promises.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            } else {
                return await promises[promises.length - 1]
            }
        }
    }
}

export async function last_2<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<TSource> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const values = await dataFunc.generator()
            // Promise Array - Predicate
            for (let i = values.length - 1; i >= 0; i--) {
                const value = values[i]
                if (predicate(value)) {
                    return value
                }
            }
            break
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const promises = dataFunc.generator()
            // Promise Array - Predicate
            for (let i = promises.length - 1; i >= 0; i--) {
                const value = await promises[i]
                if (predicate(value)) {
                    return value
                }
            }
            break
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const promises = await dataFunc.generator()
            // Promise Array - Predicate
            for (let i = promises.length - 1; i >= 0; i--) {
                const value = await promises[i]
                if (predicate(value)) {
                    return value
                }
            }
            break
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}

export async function lastOrDefault_1<TSource>(
    source: IParallelEnumerable<TSource>): Promise<TSource | null> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const values = await dataFunc.generator()
            if (values.length === 0) {
                return null
            } else {
                return values[values.length - 1]
            }
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const promises = dataFunc.generator()
            if (promises.length === 0) {
                return null
            } else {
                return await promises[promises.length - 1]
            }
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const promises = await dataFunc.generator()
            if (promises.length === 0) {
                return null
            } else {
                return await promises[promises.length - 1]
            }
        }
    }
}

export async function lastOrDefault_2<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<TSource | null> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const values = await dataFunc.generator()
            for (let i = values.length - 1; i >= 0; i--) {
                const value = values[i]
                if (predicate(value)) {
                    return value
                }
            }

            break
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const promises = dataFunc.generator()
            for (let i = promises.length - 1; i >= 0; i--) {
                const value = await promises[i]
                if (predicate(value)) {
                    return value
                }
            }

            break
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const promises = await dataFunc.generator()
            for (let i = promises.length - 1; i >= 0; i--) {
                const value = await promises[i]
                if (predicate(value)) {
                    return value
                }
            }

            break
        }
    }

    return null
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

export async function single_1<TSource>(source: IParallelEnumerable<TSource>): Promise<TSource> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const results = await dataFunc.generator()
            if (results.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (results.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return results[0]
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const results = dataFunc.generator()
            if (results.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (results.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return results[0]
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const results = await dataFunc.generator()
            if (results.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (results.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return await results[0]
        }
    }
}

export async function single_2<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<TSource> {
    const results = await toArray(source)
    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of results) {
        if (predicate(value)) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneMatchingElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }
    }

    if (hasValue === false) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return singleValue as TSource
}

export async function singleOrDefault_1<TSource>(
    source: IParallelEnumerable<TSource>): Promise<TSource | null> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const results = await dataFunc.generator()
            if (results.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (results.length === 0) {
                return null
            }

            return results[0]
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const results = dataFunc.generator()
            if (results.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (results.length === 0) {
                return null
            }

            return results[0]
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const results = await dataFunc.generator()
            if (results.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (results.length === 0) {
                return null
            }

            return await results[0]
        }
    }
}

export async function singleOrDefault_2<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<TSource | null> {
    const results = await toArray(source)

    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of results) {
        if (predicate(value)) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }
    }

    return singleValue
}

export async function sum_1(
    source: IAsyncParallel<number>): Promise<number> {
    let totalSum = 0
    for (const value of await source.toArray()) {
        totalSum += value
    }

    return totalSum
}

export async function sum_2<TSource>(
    source: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number> {
    let total = 0
    for (const value of await source.toArray()) {
        total += selector(value)
    }

    return total
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

export function zip_1<T, Y>(
    source: IAsyncParallel<T>,
    second: IAsyncParallel<Y>): IParallelEnumerable<[T, Y]> {
    async function generator() {
        const [left, right] = await Promise.all([source.toArray(), second.toArray()])
        const maxLength = left.length > right.length ? left.length : right.length
        const results = new Array<[T, Y]>(maxLength)
        for (let i = 0; i < maxLength; i++) {
            const a = left[i]
            const b = right[i]
            results[i] = [a, b]
        }
        return results
    }
    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function zip_2<T, Y, OUT>(
    source: IAsyncParallel<T>,
    second: IAsyncParallel<Y>,
    resultSelector: (x: T, y: Y) => OUT): IParallelEnumerable<OUT> {
    async function generator() {
        const [left, right] = await Promise.all([source.toArray(), second.toArray()])
        const maxLength = left.length > right.length ? left.length : right.length
        const results = new Array<OUT>(maxLength)
        for (let i = 0; i < maxLength; i++) {
            const a = left[i]
            const b = right[i]
            results[i] = resultSelector(a, b)
        }
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function toArray<TSource>(source: IParallelEnumerable<TSource>): Promise<TSource[]> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
            return dataFunc.generator()
        case ParallelGeneratorType.ArrayOfPromises:
            return Promise.all(dataFunc.generator())
        case ParallelGeneratorType.PromiseOfPromises:
            return (async () => {
                const data = await dataFunc.generator()
                return Promise.all(data)
            })()
        default:
            throw new Error("Not Implemented")
    }
}
