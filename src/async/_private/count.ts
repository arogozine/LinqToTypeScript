/**
 * Returns the number of elements in a sequence
 * or represents how many elements in the specified sequence satisfy a condition
 * if the predicate is specified.
 * @param source A sequence that contains elements to be counted.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The number of elements in the input sequence.
 */
export function count<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<number> {
    if (predicate) {
        return count2(source, predicate)
    } else {
        return count1(source)
    }
}

const count1 = async <T>(source: AsyncIterable<T>) => {
    let total = 0

    for await (const _ of source) {
        total++
    }

    return total
}

const count2 = async <T>(source: AsyncIterable<T>, predicate: (x: T) => boolean) => {
    let total = 0
    for await (const value of source) {
        if (predicate(value) === true) {
            total++
        }
    }
    return total
}
