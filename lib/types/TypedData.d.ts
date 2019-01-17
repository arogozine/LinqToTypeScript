import { ParallelGeneratorType } from "./ParallelGeneratorType";
/**
 * @private
 */
export declare type TypedData<T> = {
    readonly type: ParallelGeneratorType.PromiseToArray;
    readonly generator: () => Promise<T[]>;
} | {
    readonly type: ParallelGeneratorType.ArrayOfPromises;
    readonly generator: () => Array<Promise<T>>;
} | {
    readonly type: ParallelGeneratorType.PromiseOfPromises;
    readonly generator: () => Promise<Array<Promise<T>>>;
};
