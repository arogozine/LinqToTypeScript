import type { ParallelGeneratorType } from "./ParallelGeneratorType"

/**
 * Specifies how data is stored in the parallel enumerable.
 */
export type TypedData<T> = {
    readonly type: ParallelGeneratorType.PromiseToArray
    readonly generator: () => Promise<T[]>
} | {
    readonly type: ParallelGeneratorType.ArrayOfPromises
    readonly generator: () => Promise<T>[]
} | {
    readonly type: ParallelGeneratorType.PromiseOfPromises
    readonly generator: () => Promise<Promise<T>[]>
}
