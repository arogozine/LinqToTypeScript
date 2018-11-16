export async function firstOrDefaultAsync<T>(
    source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null> {
    for (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    return null
}
