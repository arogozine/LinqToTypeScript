import { ErrorString, InvalidOperationException } from "../../shared"

/**
 * Returns the first element in a sequence that satisfies a specified condition.
 * @param source An AsyncIterable<TSource> to return an element from.
 * @param predicate An async function to test each element for a condition.
 * @throws {InvalidOperationException} No elements in Iteration matching predicate
 * @returns The first element in the sequence that passes the test in the specified predicate function.
 */
export const firstAsync = async <TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource> => {
    for await (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}
