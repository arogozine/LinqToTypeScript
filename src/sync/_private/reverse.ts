import type { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export const reverse = <TSource>(source: Iterable<TSource>): IEnumerable<TSource> => {
    function* iterator() {
        const array = [...source]
        for (let i = array.length - 1; i >= 0; i--) {
            yield array[i]
        }
    }

    return new BasicEnumerable(iterator)
}
