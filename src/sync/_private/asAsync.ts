import { fromAsync } from "../../async/static/fromAsync"

/**
 * Converts the iterable to an @see {IAsyncEnumerable}
 * @param source The Iterable<T> to convert
 * @returns An IAsyncEnumerable<T>
 */
export const asAsync = <TSource>(source: Iterable<TSource>) => {
    async function* generator() {
        for (const value of source) {
            yield value
        }
    }

    return fromAsync(generator)
}
