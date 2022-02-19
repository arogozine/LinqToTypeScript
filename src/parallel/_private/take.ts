import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const take = <TSource>(
    source: IParallelEnumerable<TSource>,
    amount: number): IParallelEnumerable<TSource> => {
    const amountLeft = amount > 0 ? amount : 0
    const dataFunc = source.dataFunc

    switch (dataFunc.type) {
        case ParallelGeneratorType.ArrayOfPromises:
            const generator1 = () => dataFunc.generator().splice(0, amountLeft)
            return new BasicParallelEnumerable<TSource>({
                generator: generator1,
                type: ParallelGeneratorType.ArrayOfPromises,
            })
        case ParallelGeneratorType.PromiseOfPromises:
            const generator2 = () => dataFunc.generator().then((x) => x.splice(0, amountLeft))
            return new BasicParallelEnumerable<TSource>({
                generator: generator2,
                type: ParallelGeneratorType.PromiseOfPromises,
            })
        case ParallelGeneratorType.PromiseToArray:
        default:
            const generator3 = () => dataFunc.generator().then((x) => x.splice(0, amountLeft))
            return new BasicParallelEnumerable<TSource>({
                generator: generator3,
                type: ParallelGeneratorType.PromiseToArray,
            })
    }
}
