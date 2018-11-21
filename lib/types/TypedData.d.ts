import { ParallelGeneratorType } from "../parallel/ParallelGeneratorType";
/**
 * @private
 */
export declare type TypedData<T> = {
    type: ParallelGeneratorType.PromiseToArray;
    generator: () => Promise<T[]>;
} | {
    type: ParallelGeneratorType.ArrayOfPromises;
    generator: () => Array<Promise<T>>;
} | {
    type: ParallelGeneratorType.PromiseOfPromises;
    generator: () => Promise<Array<Promise<T>>>;
};
