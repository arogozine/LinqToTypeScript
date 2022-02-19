import { ErrorString, InvalidOperationException } from "../../shared"
import { IParallelEnumerable } from "../../types/IParallelEnumerable"
import { nextIterationAsync } from "./_nextIterationAsync"
import { typeDataToArray } from "./_typeDataToArray"

export const minAsync = async <TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> => {
    const dataFunc = nextIterationAsync(source, selector)
    const maxInfo = await typeDataToArray(dataFunc)

    if (maxInfo.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return Math.min.apply(null, maxInfo)
}
