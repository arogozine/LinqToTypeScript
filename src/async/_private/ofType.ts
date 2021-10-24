import { IAsyncEnumerable } from "../../types/IAsyncEnumerable"
import { InferType, OfType } from "../../types/InferType"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Applies a type filter to a source iteration
 * @param source Async Iteration to Filtery by Type
 * @param type Either value for typeof or a consturctor function
 * @returns Values that match the type string or are instance of type
 */
export const ofType = <TSource, TType extends OfType>(
    source: AsyncIterable<TSource>,
    type: TType): IAsyncEnumerable<InferType<TType>> => {

    const typeCheck = typeof type === "string" ?
        ((x: TSource) => typeof x === type) as (x: TSource) => x is InferType<TType> :
        ((x: TSource) => x instanceof (type as any)) as (x: TSource) => x is InferType<TType>

    async function *iterator(): AsyncIterableIterator<InferType<TType>> {
        for await (const item of source) {
            if (typeCheck(item)) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
