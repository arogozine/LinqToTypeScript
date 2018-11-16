export function firstOrDefault<T>(source: Iterable<T>): T | null
export function firstOrDefault<T>(source: Iterable<T>, predicate: (x: T) => boolean): T | null
export function firstOrDefault<T>(source: Iterable<T>, predicate?: (x: T) => boolean): T | null {
    if (predicate) {
        return firstOrDefault_2(source, predicate)
    } else {
        return firstOrDefault_1(source)
    }
}

function firstOrDefault_1<T>(source: Iterable<T>): T | null {
    const first = source[Symbol.iterator]().next()
    return first.value || null
}

function firstOrDefault_2<T>(source: Iterable<T>, predicate: (x: T) => boolean): T | null {
    for (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    return null
}
