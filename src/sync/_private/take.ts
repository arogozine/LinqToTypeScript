import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export function take<T>(source: Iterable<T>, amount: number): IEnumerable<T> {

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

    return new BasicEnumerable<T>(iterator)
}
