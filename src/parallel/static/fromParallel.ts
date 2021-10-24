import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

type FromParallelFunc = {
    /**
     * Creates an IParallelEnumerable from a function that returns an Array of Promises
     * @param type Array of Promises
     * @param generator Function that gives back an array of promises
     * @returns IParallelEnumerable<T>
     */
    <TSource>(
        type: ParallelGeneratorType.ArrayOfPromises,
        generator: () => Promise<TSource>[]): IParallelEnumerable<TSource>
    /**
     * Creates an IParallelEnumerable from a function that returns a Array Promise
     * @param type Promise to Array
     * @param generator Async function which returns an array of values
     * @returns IParallelEnumerable<T>
     */
    <TSource>(
        type: ParallelGeneratorType.PromiseToArray,
        generator: () => Promise<TSource[]>): IParallelEnumerable<TSource>
    /**
     * Creates an IParallelEnumerable from a function that returns an promise of an promise array of valus
     * @param type Promise of Promises
     * @param generator Async function that returns an array of value promises
     * @returns IParallelEnumerable<T>
     */
    <TSource>(
        type: ParallelGeneratorType.PromiseOfPromises,
        generator: () => Promise<Promise<TSource>[]>): IParallelEnumerable<TSource>
    }


export const fromParallel: FromParallelFunc = <TSource>(
    type: any,
    generator: () => any) => {
    return new BasicParallelEnumerable<TSource>({
        generator,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type,
    })
}
