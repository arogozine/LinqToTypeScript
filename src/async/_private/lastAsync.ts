import { ErrorString, InvalidOperationException } from "../../shared"

export const lastAsync = async <TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource> => {
    let last: TSource | null = null
    let hasValue = false

    for await (const value of source) {
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
