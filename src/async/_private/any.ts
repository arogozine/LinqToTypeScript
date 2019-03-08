/**
 * Determines whether a sequence contains any elements.
 * If predicate is specified, determines whether any element of a sequence satisfies a condition.
 * @param source The AsyncIterable<T> to check for emptiness or apply the predicate to.
 * @param predicate A function to test each element for a condition.
 * @returns ``true`` if every element of the source sequence passes the test in the specified predicate,
 * or if the sequence is empty; otherwise, ``false``.
 */
export function any<TSource>(
    source: AsyncIterable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<boolean> {
    if (predicate) {
        return any_2(source, predicate)
    } else {
        return any_1(source)
    }
}

async function any_1<TSource>(source: AsyncIterable<TSource>): Promise<boolean> {
    for await (const _ of source) {
        return true
    }

    return false
}

async function any_2<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => boolean): Promise<boolean> {
    for await (const item of source) {
        if (predicate(item) === true) {
            return true
        }
    }

    return false
}
