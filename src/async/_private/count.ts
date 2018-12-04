/**
 * Returns the number of elements in a sequence
 * or represents how many elements in the specified sequence satisfy a condition
 * if the predicate is specified.
 * @param source A sequence that contains elements to be counted.
 * @param predicate A function to test each element for a condition. Optional.
 */
export function count<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<number> {
    if (predicate) {
        return count_2(source, predicate)
    } else {
        return count_1(source)
    }
}

async function count_1<T>(source: AsyncIterable<T>): Promise<number> {
    let total = 0

    for await (const _ of source) {
        total++
    }

    return total
}

async function count_2<T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<number> {
    let total = 0
    for await (const value of source) {
        if (predicate(value) === true) {
            total++
        }
    }
    return total
}
