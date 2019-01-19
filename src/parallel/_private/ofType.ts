import { IAsyncParallel, InferType, IParallelEnumerable, OfType, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Applies a type filter to a source iteration
 * @param source Async Iteration to Filtery by Type
 * @param type Either value for typeof or a consturctor function
 * @returns Values that match the type string or are instance of type
 */
export function ofType<TSource, TType extends OfType>(
    source: IAsyncParallel<TSource>,
    type: TType): IParallelEnumerable<InferType<TType>> {

    const typeCheck = typeof type === "string" ?
        ((x: TSource) => typeof x === type) as (x: TSource) => x is InferType<TType> :
        ((x: TSource) => x instanceof (type as any)) as (x: TSource) => x is InferType<TType>

    const data = async () =>
        (await source.toArray()).filter(typeCheck)

    return new BasicParallelEnumerable({
        generator: data,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
