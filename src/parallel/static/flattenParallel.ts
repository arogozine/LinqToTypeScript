import { type IParallelEnumerable, type IParallelFlatten, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

type FlatternParallelFunc = {
    /**
     * Flattens a parallel iterable
     * @param source IParallelFlatten to flatten
     * @param shallow When false - recurses the iterable types
     */
    <TSource>(
        source: IParallelFlatten<TSource>,
        shallow?: false): IParallelEnumerable<TSource>
    /**
     * Flattens a parallel iterable
     * @param source IParallelFlatten to flatten
     * @param shallow When false - recurses the iterable types
     */
    <TSource>(
        source: IParallelFlatten<TSource>,
        shallow: true): IParallelEnumerable<TSource | AsyncIterable<TSource>>
}


export const flattenParallel: FlatternParallelFunc = <TSource>(
    source: IParallelFlatten<TSource>,
    shallow?: boolean): IParallelEnumerable<TSource | AsyncIterable<TSource>> => {

    async function* iterator(sourceInner: AsyncIterable<any>)
        : AsyncIterableIterator<TSource | AsyncIterable<TSource>> {
        for await (const item of sourceInner) {

            if (item[Symbol.asyncIterator] !== undefined) {

                const items = shallow ? item : iterator(item as AsyncIterable<any>)
                for await (const inner of items) {
                    yield inner
                }
            } else {
                yield item
            }
        }
    }

    const generator = async () => {
        const results = []
        for await (const x of iterator(source)) {
            results.push(x)
        }
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
