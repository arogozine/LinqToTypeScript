import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * @throws {InvalidOperationException} No Matching Elements in Iteration
 * @param source Source Iteration
 * @param predicate Predicate to Select First Element
 */
export async function firstAsync<T>(
    source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T> {
    for (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}
