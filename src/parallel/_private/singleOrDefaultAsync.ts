import { ErrorString, InvalidOperationException } from "../../shared"
import type { IParallelEnumerable } from "../../types"
import { toArray } from "./toArray"

export const singleOrDefaultAsync = async <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> => {
    const results = await toArray(source)

    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of results) {
        if (await predicate(value) === true) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }
    }

    return singleValue
}
