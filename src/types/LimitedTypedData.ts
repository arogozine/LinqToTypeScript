import type { ParallelGeneratorType } from "./ParallelGeneratorType"

/**
 * @private
 */
export type LimitedTypedData<T> = {
    readonly type: ParallelGeneratorType.ArrayOfPromises
    readonly generator: () => Promise<T>[]
} | {
    readonly type: ParallelGeneratorType.PromiseOfPromises
    readonly generator: () => Promise<Promise<T>[]>
}
