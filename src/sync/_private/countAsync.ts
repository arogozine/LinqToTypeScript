export async function countAsync<T>(
    source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<number> {
    let count = 0
    for (const value of source) {
        if (await predicate(value) === true) {
            count++
        }
    }
    return count
}
