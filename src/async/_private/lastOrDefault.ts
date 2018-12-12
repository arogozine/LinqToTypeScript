/**
 * Returns the last element of a sequence.
 * If predicate is specified, the last element of a sequence that satisfies a specified condition.
 * @param source An AsyncIterable<T> to return the last element of.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The value at the last position in the source sequence
 * or the last element in the sequence that passes the test in the specified predicate function.
 */
export async function lastOrDefault<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null> {

    if (predicate) {
        return lastOrDefault_2(source, predicate)
    } else {
        return lastOrDefault_1(source)
    }
}

async function lastOrDefault_1<T>(source: AsyncIterable<T>): Promise<T | null> {
    let last: T | null = null

    for await (const value of source) {
        last = value
    }

    return last
}

async function lastOrDefault_2<T>(
    source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<T | null> {

    let last: T | null = null

    for await (const value of source) {
        if (predicate(value) === true) {
            last = value
        }
    }

    return last
}
