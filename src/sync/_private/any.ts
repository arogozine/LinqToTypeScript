/**
 * Determines whether a sequence contains any elements.
 * If predicate is specified, determines whether any element of a sequence satisfies a condition.
 * @param source The Iterable<T> to check for emptiness or apply the predicate to.
 * @param predicate A function to test each element for a condition.
 * @returns true if the source sequence contains any elements or passes the test specified; otherwise, false.
 */
export function any<TSource>(
    source: Iterable<TSource>,
    predicate?: (x: TSource) => boolean): boolean {
    if (predicate) {
        return any2(source, predicate)
    } else {
        return any1(source)
    }
}

const any1 = <TSource>(source: Iterable<TSource>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of source) {
        return true
    }

    return false
}

const any2 = <TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean) => {
    for (const item of source) {
        if (predicate(item) === true) {
            return true
        }
    }

    return false
}
