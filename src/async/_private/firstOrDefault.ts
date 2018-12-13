/**
 * Returns first element in sequence that satisfies predicate otherwise
 * returns the first element in the sequence. Returns null if no value found.
 * @param source An AsyncIterable<T> to return an element from.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The first element in the sequence
 * or the first element that passes the test in the specified predicate function.
 * Returns null if no value found.
 */
export function firstOrDefault<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null> {
    if (predicate) {
        return firstOrDefault_2(source, predicate)
    } else {
        return firstOrDefault_1(source)
    }
}

async function firstOrDefault_1<T>(source: AsyncIterable<T>): Promise<T | null> {
    const first = await source[Symbol.asyncIterator]().next()
    return first.value || null
}

async function firstOrDefault_2<T>(
    source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<T | null> {
    for await (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    return null
}
