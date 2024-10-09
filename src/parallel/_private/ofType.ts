import { type InferType, type IParallelEnumerable, type OfType, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIteration } from "./_nextIteration"
import { typeDataToArray } from "./_typeDataToArray"

export const ofType = <TSource, TType extends OfType>(
    source: IParallelEnumerable<TSource>,
    type: TType): IParallelEnumerable<InferType<TType>> => {

    const typeCheck: (x: TSource) => [boolean, InferType<TType>] = typeof type === "string" ?
        (x: TSource) => [typeof x === type, x as InferType<TType>] :
        (x: TSource) => [x instanceof (type as any), x as InferType<TType>]

    const generator = async () => {
        const dataFunc = nextIteration(source, typeCheck)
        const values = await typeDataToArray(dataFunc)
        const filteredValues = []
        for (const [pass, value] of values) {
            if (pass) {
                filteredValues.push(value)
            }
        }
        return filteredValues
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
