import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export const append = <TSource>(source: Iterable<TSource>, element: TSource): IEnumerable<TSource> => {
    function* iterator() {
        yield* source
        yield element
    }

    return new BasicEnumerable(iterator)
}
