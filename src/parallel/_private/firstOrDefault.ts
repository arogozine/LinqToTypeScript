import { type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { toArray } from "./toArray"

export const firstOrDefault = <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<TSource | null> => {
    if (predicate) {
        return firstOrDefault2(source, predicate)
    } else {
        return firstOrDefault1(source)
    }
}

const firstOrDefault1 = async <TSource>(
    source: IParallelEnumerable<TSource>): Promise<TSource | null> => {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray: {
            const values = await dataFunc.generator()
            if (values.length === 0) {
                return null
            } else {
                return values[0]
            }
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const promises = dataFunc.generator()
            if (promises.length === 0) {
                return null
            } else {
                return await promises[0]
            }
        }
        case ParallelGeneratorType.PromiseOfPromises: {
            const promises = await dataFunc.generator()
            if (promises.length === 0) {
                return null
            } else {
                return await promises[0]
            }
        }
    }
}

const firstOrDefault2 = async <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<TSource | null> => {
    const data = await toArray(source)
    for (const value of data) {
        if (predicate(value) === true) {
            return value
        }
    }

    return null
}
