import { IAsyncParallel, IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Returns elements from a sequence as long as a specified condition is true.
 * The element's index is used in the logic of the predicate function.
 * @param source The sequence to return elements from.
 * @param predicate An async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IParallelEnumerable<T> that contains elements
 * from the input sequence that occur before the element at which the test no longer passes.
 */
export function takeWhileAsync<TSource>(
    source: IAsyncParallel<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
    const generator = async () => {
        const values = await source.toArray()
        const results = new Array<TSource>()
        if (predicate.length === 1) {
            const sPredicate = predicate as (x: TSource) => Promise<boolean>
            for (const value of values) {
                if (await sPredicate(value) === true) {
                    results.push(value)
                } else {
                    break
                }
            }
        } else {
            for (let i = 0; i < values.length; i++) {
                const value = values[i]
                if (await predicate(value, i) === true) {
                    results.push(value)
                } else {
                    break
                }
            }
        }
        return results
    }

    return new BasicParallelEnumerable<TSource>({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
