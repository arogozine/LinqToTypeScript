export async function firstOrDefaultAsync<T>(
    source: AsyncIterable<T>,
    predicate: (x: T) => Promise<boolean>): Promise<T | null> {
    for await (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    return null
}
