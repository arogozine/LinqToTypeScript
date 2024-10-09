import { StrictEqualityComparer } from "../../shared"
import type { IAsyncEnumerable, IEqualityComparer } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const except = <TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IAsyncEnumerable<TSource> => {

    async function *iterator() {
        // TODO: async eq of [...second] ?
        const secondArray = []
        for await (const x of second) {
            secondArray.push(x)
        }

        for await (const firstItem of first) {

            let exists = false
            for (let j = 0; j < secondArray.length; j++) {
                const secondItem = secondArray[j]

                if (comparer(firstItem, secondItem) === true) {
                    exists = true
                    break
                }
            }

            if (exists === false) {
                yield firstItem
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
