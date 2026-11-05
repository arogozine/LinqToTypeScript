import { ErrorString, InvalidOperationException } from "../../shared"

export const lastAsync = async <TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource> => {
    let last: TSource | undefined
    let hasValue = false

    for (const value of source) {
        if (await predicate(value) === true) {
            last = value
            hasValue = true
        }
    }

    if (!hasValue) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return last as TSource
}
