import { ErrorString, InvalidOperationException } from "../../shared"
import { IParallelEnumerable, TypedData } from "../../types"
import { nextIteration } from "./_nextIteration"
import { typeDataToArray } from "./_typeDataToArray"

type MinFunc = {
    (source: IParallelEnumerable<number>): Promise<number>
    <TSource>(
        source: IParallelEnumerable<TSource>,
        selector: (x: TSource) => number): Promise<number>
}

export const min: MinFunc = async <TSource>(
    source: IParallelEnumerable<TSource> | IParallelEnumerable<number>,
    selector?: (x: TSource) => number): Promise<number> => {

    let dataFunc : TypedData<number>
    if (selector) {
        dataFunc = nextIteration(source as IParallelEnumerable<TSource>, selector)
    } else {
        dataFunc = source.dataFunc as TypedData<number>
    }

    const data = await typeDataToArray(dataFunc)

    if (data.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return Math.min.apply(null, data)
}
