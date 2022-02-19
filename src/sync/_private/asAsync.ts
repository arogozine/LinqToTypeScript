import { fromAsync } from "../../async/static/fromAsync"

export const asAsync = <TSource>(source: Iterable<TSource>) => {
    async function* generator() {
        for (const value of source) {
            yield value
        }
    }

    return fromAsync(generator)
}
