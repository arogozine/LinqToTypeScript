/**
 * Returns the number of elements in a sequence
 * or represents how many elements in the specified sequence satisfy a condition
 * if the predicate is specified.
 * @param source A sequence that contains elements to be counted.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The number of elements in the input sequence.
 */
export function count<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): number {
    if (predicate) {
        return count_2(source, predicate)
    } else {
        return count_1(source)
    }
}

function count_1<T>(source: Iterable<T>): number {
    // tslint:disable-next-line:no-shadowed-variable
    let count = 0

    for (const _ of source) {
        count++
    }

    return count
}

function count_2<T>(source: Iterable<T>, predicate: (x: T) => boolean): number {
    // tslint:disable-next-line:no-shadowed-variable
    let count = 0
    for (const value of source) {
        if (predicate(value) === true) {
            count++
        }
    }
    return count
}
