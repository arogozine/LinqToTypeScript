/**
 * Underlying data type for a Parallel Enumerable
 */
// eslint-disable-next-line no-shadow
export const enum ParallelGeneratorType {
    /**
     * Generator returns a Promise which returns values
     */
    PromiseToArray,
    /**
     * Generator returns an array of promises
     */
    ArrayOfPromises,
    /**
     * Generator returns a Promise which returns promises
     */
    PromiseOfPromises,
}
