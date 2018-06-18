/**
 * Underlying data type for a Parallel Enumerable
 */
export declare const enum ParallelGeneratorType {
    /**
     * Generator returns a Promise which returns values
     */
    PromiseToArray = 0,
    /**
     * Generator returns an array of promises
     */
    ArrayOfPromises = 1,
    /**
     * Generator returns a Promise which returns promises
     */
    PromiseOfPromises = 2
}
