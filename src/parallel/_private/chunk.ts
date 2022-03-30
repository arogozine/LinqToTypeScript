import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { ArgumentOutOfRangeException } from "../../shared"
import { IParallelEnumerable, ParallelGeneratorType, TypedData } from "../../types"

export const chunk = <TSource>(source: IParallelEnumerable<TSource>, size: number): IParallelEnumerable<TSource[]> => {
    if (size < 1) {
        throw new ArgumentOutOfRangeException("size")
    }

    let dataFunc: TypedData<TSource[]>

    switch (source.dataFunc.type) {
        case ParallelGeneratorType.ArrayOfPromises:
            const arrayOfPromises = source.dataFunc.generator
            dataFunc = {
                type: ParallelGeneratorType.ArrayOfPromises,
                generator: () => {
                    const chunks: Promise<TSource[]>[] = []
                    let yieldChunk = []
                    for (const promise of arrayOfPromises()) {
                        yieldChunk.push(promise)

                        if (yieldChunk.length === size) {
                            chunks.push(Promise.all(yieldChunk))
                            yieldChunk = []
                        }
                    }

                    if (yieldChunk.length) {
                        chunks.push(Promise.all(yieldChunk))
                    }

                    return chunks
                }
            }
            break
        case ParallelGeneratorType.PromiseOfPromises:
            const promiseOfPromises = source.dataFunc.generator
            dataFunc = {
                type: ParallelGeneratorType.PromiseOfPromises,
                generator: async () => {
                    const chunks: Promise<TSource[]>[] = []
                    let yieldChunk = []
                    for (const promise of await promiseOfPromises()) {
                        yieldChunk.push(promise)

                        if (yieldChunk.length === size) {
                            chunks.push(Promise.all(yieldChunk))
                            yieldChunk = []
                        }
                    }

                    if (yieldChunk.length) {
                        chunks.push(Promise.all(yieldChunk))
                    }

                    return chunks
                }
            }
            break
        case ParallelGeneratorType.PromiseToArray:
            const promiseToArray = source.dataFunc.generator
            dataFunc = {
                type: ParallelGeneratorType.PromiseToArray,
                generator: async () => {
                    const chunks: TSource[][] = []
                    let yieldChunk = []
                    for (const value of await promiseToArray()) {
                        yieldChunk.push(value)

                        if (yieldChunk.length === size) {
                            chunks.push(yieldChunk)
                            yieldChunk = []
                        }
                    }

                    if (yieldChunk.length) {
                        chunks.push(yieldChunk)
                    }

                    return chunks
                }
            }
            break
    }

    return new BasicParallelEnumerable(dataFunc)
}