export async function lastOrDefaultAsync<T>(
    source: AsyncIterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null> {

    let last: T | null = null

    for await (const value of source) {
        if (await predicate(value) === true) {
            last = value
        }
    }

    return last
}
