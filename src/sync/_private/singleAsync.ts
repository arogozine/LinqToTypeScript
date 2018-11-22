import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * @throws {InvalidOperationException} Sequence contains more than one matching element
 * @throws {InvalidOperationException} Sequence contains no matching elements
 */
export async function singleAsync<TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
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
