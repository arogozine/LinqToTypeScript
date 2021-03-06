/**
 * Returns the number of elements in a sequence
 * or represents how many elements in the specified sequence satisfy a condition
 * if the predicate is specified.
 * @param source A sequence that contains elements to be counted.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The number of elements in the input sequence.
 */
export const count = <TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): number => {
    if (predicate) {
        return count2(source, predicate)
    } else {
        return count1(source)
    }
}

const count1 = <T>(source: Iterable<T>): number => {
    // eslint-disable-next-line no-shadow
    let count = 0

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of source) {
        count++
    }

    return count
}

const count2 = <T>(source: Iterable<T>, predicate: (x: T) => boolean): number => {
    // eslint-disable-next-line no-shadow
    let count = 0
    for (const value of source) {
        if (predicate(value) === true) {
            count++
        }
    }
    return count
}
