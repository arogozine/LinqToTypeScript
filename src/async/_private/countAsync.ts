export async function countAsync<T>(
    source: AsyncIterable<T>,
    predicate: (x: T) => Promise<boolean>): Promise<number> {
    let count = 0
    for await (const value of source) {
        if (await predicate(value) === true) {
            count++
        }
    }
    return count
}
