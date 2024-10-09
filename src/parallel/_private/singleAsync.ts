import { ErrorString, InvalidOperationException } from "../../shared"
import { type IParallelEnumerable } from "../../types"
import { toArray } from "./toArray"

export const singleAsync = async <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource> => {
    const results = await toArray(source)

    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of results) {
        if (await predicate(value) === true) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneMatchingElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }
    }

    if (hasValue === false) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return singleValue as TSource
}
