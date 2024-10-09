import type { IEnumerable, InferType, OfType } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

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
