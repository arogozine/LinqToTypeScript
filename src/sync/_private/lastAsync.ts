import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * @throws {InvalidOperationException} No Matching Element
 */
export async function lastAsync<TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
    let last: TSource | undefined

    for (const value of source) {
        if (await predicate(value) === true) {
            last = value
        }
    }

    if (!last) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return last
}
