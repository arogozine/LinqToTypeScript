import { IEnumerable } from "../../types/IEnumerable"
import { BasicEnumerable } from "../BasicEnumerable"

export const skip = <TSource>(source: Iterable<TSource>, count: number): IEnumerable<TSource> => {

    function* iterator() {
        let i = 0
        for (const item of source) {
            if (i++ >= count) {
                yield item
            }
        }
    }

    return new BasicEnumerable<TSource>(iterator)
}
