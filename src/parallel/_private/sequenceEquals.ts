import { StrictEqualityComparer } from "../../shared"
import type { IAsyncParallel, IEqualityComparer } from "../../types"

export const sequenceEquals = async <TSource>(
    // eslint-disable-next-line no-shadow
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): Promise<boolean> => {

    const firstArray = await first.toArray()
    const secondArray = await second.toArray()

    if (firstArray.length !== secondArray.length) {
        return false
    }

    for (let i = 0; i < firstArray.length; i++) {
        const firstResult = firstArray[i]
        const secondResult = secondArray[i]

        if (comparer(firstResult, secondResult) === false) {
            return false
        }
    }

    return true
}
