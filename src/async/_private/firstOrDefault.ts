export function firstOrDefault<T>(source: AsyncIterable<T>, predicate?: (x: T) => boolean): Promise<T | null> {
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
