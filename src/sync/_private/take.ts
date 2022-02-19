import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export const take = <TSource>(source: Iterable<TSource>, amount: number): IEnumerable<TSource> => {

    function* iterator() {
        // negative amounts should yield empty
        let amountLeft = amount > 0 ? amount : 0
        for (const item of source) {
            if (amountLeft-- === 0) {
                break
            } else {
                yield item
            }
        }
    }

    return new BasicEnumerable<TSource>(iterator)
}
