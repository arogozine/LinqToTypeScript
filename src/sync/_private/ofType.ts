import { IEnumerable } from "../../types"
import { InferType, OfType } from "../../types/InferType"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Applies a type filter to a source iteration
 * @param source Iteration to Filtery by Type
 * @param type Either value for typeof or a consturctor function
 * @returns Values that match the type string or are instance of type
 */
export const ofType = <TSource, TType extends OfType>(
    source: Iterable<TSource>,
    type: TType): IEnumerable<InferType<TType>> => {

    const typeCheck = typeof type === "string" ?
        ((x: TSource) => typeof x === type) as (x: TSource) => x is InferType<TType> :
        ((x: TSource) => x instanceof (type as any)) as (x: TSource) => x is InferType<TType>

    function *iterator(): IterableIterator<InferType<TType>> {
        for (const item of source) {
            if (typeCheck(item)) {
                yield item
            }
        }
    }

    return new BasicEnumerable(iterator)
}
