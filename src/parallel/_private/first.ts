import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { toArray } from "./toArray"

export function first<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<TSource> {
    if (predicate) {
        return first_2(source, predicate)
    } else {
        return first_1(source)
    }
}

async function first_1<TSource>(
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

async function first_2<TSource>(
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
