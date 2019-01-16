import { from } from "../../async/_private/from"

/**
 * Converts the iterable to an @see {IAsyncEnumerable}
 */
export const asAsync = <TSource>(source: Iterable<TSource>) => {
    async function* generator() {
        for (const value of source) {
            yield value
        }
    }

    return from(generator)
}
