import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { toArray } from "./toArray"

/**
 * If predicate is specified returns the only element of a sequence that satisfies a specified condition,
 * ootherwise returns the only element of a sequence. Returns a default value if no such element exists.
 * @param source An IParallelEnumerable<T> to return a single element from.
 * @param predicate A function to test an element for a condition. Optional.
 * @throws {InvalidOperationException}
 * If predicate is specified more than one element satisfies the condition in predicate,
 * otherwise the input sequence contains more than one element.
 * @returns The single element of the input sequence that satisfies the condition,
 * or null if no such element is found.
 */
export function singleOrDefault<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<TSource | null> {
    if (predicate) {
        return singleOrDefault_2(source, predicate)
    } else {
        return singleOrDefault_1(source)
    }
}

async function singleOrDefault_1<TSource>(
    source: IParallelEnumerable<TSource>): Promise<TSource | null> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray: {
            const results = await dataFunc.generator()
            if (results.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (results.length === 0) {
                return null
            }

            return results[0]
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const results = dataFunc.generator()
            if (results.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (results.length === 0) {
                return null
            }

            return results[0]
        }
        case ParallelGeneratorType.PromiseOfPromises: {
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

async function singleOrDefault_2<TSource>(
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
