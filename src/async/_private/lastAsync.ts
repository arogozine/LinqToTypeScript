import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * @throws {InvalidOperationException} No Elements / No Match
 */
export async function lastAsync<TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
    let last: TSource | null = null

    for await (const value of source) {
        if (await predicate(value) === true) {
            last = value
        }
    }

    if (!last) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return last
}
