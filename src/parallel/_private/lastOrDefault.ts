import { type IParallelEnumerable, ParallelGeneratorType } from "../../types"

export const lastOrDefault = <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<TSource | null> => {
    if (predicate) {
        return lastOrDefault2(source, predicate)
    } else {
        return lastOrDefault1(source)
    }
}

const lastOrDefault1 = async <TSource>(
    source: IParallelEnumerable<TSource>): Promise<TSource | null> => {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray: {
            const values = await dataFunc.generator()
            if (values.length === 0) {
                return null
            } else {
                return values[values.length - 1]
            }
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const promises = dataFunc.generator()
            if (promises.length === 0) {
                return null
            } else {
                return await promises[promises.length - 1]
            }
        }
        case ParallelGeneratorType.PromiseOfPromises: {
            const promises = await dataFunc.generator()
            if (promises.length === 0) {
                return null
            } else {
                return await promises[promises.length - 1]
            }
        }
    }
}

const lastOrDefault2 = async <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<TSource | null> => {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray: {
            const values = await dataFunc.generator()
            for (let i = values.length - 1; i >= 0; i--) {
                const value = values[i]
                if (predicate(value)) {
                    return value
                }
            }

            break
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const promises = dataFunc.generator()
            for (let i = promises.length - 1; i >= 0; i--) {
                const value = await promises[i]
                if (predicate(value)) {
                    return value
                }
            }

            break
        }
        case ParallelGeneratorType.PromiseOfPromises: {
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
