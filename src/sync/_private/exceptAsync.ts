import { from } from "../../async/AsyncEnumerable"
import { IAsyncEnumerable } from "../../async/IAsyncEnumerable"
import { IAsyncEqualityComparer } from "../../shared/IAsyncEqualityComparer"

export function exceptAsync<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function *iterator() {
        const secondArray = [...second]

        for (const firstItem of first) {

            let exists = false
            for (let j = 0; j < secondArray.length; j++) {
                const secondItem = secondArray[j]

                if (await comparer(firstItem, secondItem) === true) {
                    exists = true
                    break
                }
            }

            if (exists === false) {
                yield firstItem
            }
        }
    }

    return from(iterator)
}
