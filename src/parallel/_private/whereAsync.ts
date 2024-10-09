import { type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIterationWithIndexAsync } from "./_nextIterationWithIndexAsync"
import { typeDataToArray } from "./_typeDataToArray"

export const whereAsync = <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>) => {
    const generator = async () => {
        const dataFunc = nextIterationWithIndexAsync(source, async (value, index) => {
            const keep = await predicate(value, index)
            return [keep, value] as [boolean, TSource]
        })
        const valuesAsync = await typeDataToArray(dataFunc)

        const filteredValues = []
        for (const [keep, value] of valuesAsync) {
            if (keep) {
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
