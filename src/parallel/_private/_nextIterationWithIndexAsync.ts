import { IParallelEnumerable, ParallelGeneratorType, TypedData } from "../../types"

// tslint:disable:completed-docs

export function nextIterationWithIndexAsync<TSource, TOut>(
    source: IParallelEnumerable<TSource>,
    onfulfilled: (x: TSource, index: number) => Promise<TOut>): TypedData<TOut> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray: {
            const generator = async () => {
                const results = await dataFunc.generator()
                const newPromises = new Array<Promise<TOut>>(results.length)
                for (let i = 0; i < results.length; i++) {
                    newPromises[i] = onfulfilled(results[i], i)
                }
                return newPromises
            }
            return {
                generator,
                type: ParallelGeneratorType.PromiseOfPromises,
            }
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const generator = () => dataFunc
                .generator()
                .map((promise, index) => promise.then((x) => onfulfilled(x, index)))
            return {
                generator,
                type: ParallelGeneratorType.ArrayOfPromises,
            }
        }
        case ParallelGeneratorType.PromiseOfPromises: {
            const generator = async () => {
                const promises = await dataFunc.generator()
                return promises.map((promise, index) => promise.then((x) => onfulfilled(x, index)))
            }
            return {
                generator,
                type: ParallelGeneratorType.PromiseOfPromises,
            }
        }
    }
}
