/**
 * Returns the number of elements in a sequence
 * or represents how many elements in the specified sequence satisfy a condition
 * if the predicate is specified.
 * @param source A sequence that contains elements to be counted.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The number of elements in the sequence.
 */
export const countAsync = async <TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<number> => {
    let count = 0
    for await (const value of source) {
        if (await predicate(value) === true) {
            count++
        }
    }
    return count
}
