import type { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export const concatenate = <TSource>(first: Iterable<TSource>, second: IEnumerable<TSource>): IEnumerable<TSource> => {
    function* iterator() {
        yield* first
        yield* second
    }

    return new BasicEnumerable(iterator)
}
