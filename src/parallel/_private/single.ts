import { ErrorString, InvalidOperationException } from "../../shared"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { toArray } from "./toArray"

export const single = <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<TSource> => {
    if (predicate) {
        return single2(source, predicate)
    } else {
        return single1(source)
    }
}

const single1 = async <TSource>(source: IParallelEnumerable<TSource>): Promise<TSource> => {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray: {
            const results = await dataFunc.generator()
            if (results.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (results.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return results[0]
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const results = dataFunc.generator()
            if (results.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (results.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return results[0]
        }
        case ParallelGeneratorType.PromiseOfPromises: {
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

const single2 = async <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<TSource> => {
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
