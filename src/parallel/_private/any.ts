import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { nextIteration } from "./_nextIteration"

/**
 * Determines whether a sequence contains any elements.
 * If predicate is specified, determines whether any element of a sequence satisfies a condition.
 * @param source The IEnumerable<T> to check for emptiness or apply the predicate to.
 * @param predicate A function to test each element for a condition.
 * @returns Whether or not the sequence contains any elements or contains any elements matching the predicate
 */
export const any = <TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean) => {
    if (predicate) {
        return any2(source, predicate)
    } else {
        return any1(source)
    }
}

const any1 = async <TSource>(source: IParallelEnumerable<TSource>) => {
    const dataFunc = source.dataFunc
    let values: TSource[] | Promise<TSource>[]

    switch (dataFunc.type) {
        case ParallelGeneratorType.ArrayOfPromises:
            values = dataFunc.generator()
            return values.length !== 0
        case ParallelGeneratorType.PromiseToArray:
        case ParallelGeneratorType.PromiseOfPromises:
            values = await dataFunc.generator()
            return values.length !== 0
    }
}

const any2 = async <TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => boolean) => {
    const dataFunc = nextIteration(source, predicate)
    let values: boolean[]

    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
            values = await dataFunc.generator()
            return values.includes(true)
        case ParallelGeneratorType.ArrayOfPromises:
            values = await Promise.all(dataFunc.generator())
            return values.includes(true)
        case ParallelGeneratorType.PromiseOfPromises:
            values = await Promise.all(await dataFunc.generator())
            return values.includes(true)
    }
}
