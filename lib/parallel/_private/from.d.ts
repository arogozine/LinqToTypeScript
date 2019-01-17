import { IParallelEnumerable, ParallelGeneratorType } from "../../types";
/**
 * Creates an IParallelEnumerable from a function that returns an Array of Promises
 * @param type Array of Promises
 * @param generator Function that gives back an array of promises
 * @returns IParallelEnumerable<T>
 */
export declare function from<TSource>(type: ParallelGeneratorType.ArrayOfPromises, generator: () => Array<Promise<TSource>>): IParallelEnumerable<TSource>;
/**
 * Creates an IParallelEnumerable from a function that returns a Array Promise
 * @param type Promise to Array
 * @param generator Async function which returns an array of values
 * @returns IParallelEnumerable<T>
 */
export declare function from<TSource>(type: ParallelGeneratorType.PromiseToArray, generator: () => Promise<TSource[]>): IParallelEnumerable<TSource>;
/**
 * Creates an IParallelEnumerable from a function that returns an promise of an promise array of valus
 * @param type Promise of Promises
 * @param generator Async function that returns an array of value promises
 * @returns IParallelEnumerable<T>
 */
export declare function from<TSource>(type: ParallelGeneratorType.PromiseOfPromises, generator: () => Promise<Array<Promise<TSource>>>): IParallelEnumerable<TSource>;
