import { ErrorString, InvalidOperationException } from "../../shared/TypesAndHelpers"

/**
 * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
 */
export async function singleAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
    let hasValue = false
    let singleValue: TSource | null = null

    for await (const value of source) {
        if (await predicate(value)) {
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
