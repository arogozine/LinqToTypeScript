import { ParallelGeneratorType } from "./ParallelGeneratorType";

/**
 * @private
 */
export type TypedData<T> = {
    type: ParallelGeneratorType.PromiseToArray,
    generator: () => Promise<T[]>,
} | {
    type: ParallelGeneratorType.ArrayOfPromises,
    generator: () => Array<Promise<T>>,
} | {
    type: ParallelGeneratorType.PromiseOfPromises,
    generator: () => Promise<Array<Promise<T>>>,
}
