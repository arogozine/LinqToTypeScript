import { IAsyncEqualityComparer, IAsyncParallel } from "../../types"

/**
 * Compares two parallel iterables to see if they are equal using a async comparer function.
 * @param first First Sequence
 * @param second Second Sequence
 * @param comparer Async Comparer
 * @returns Whether or not the two iterations are equal
 */
export const sequenceEqualsAsync = async <TSource>(
    // eslint-disable-next-line no-shadow
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> => {

    const firstArray = await first.toArray()
    const secondArray = await second.toArray()

    if (firstArray.length !== secondArray.length) {
        return false
    }

    for (let i = 0; i < firstArray.length; i++) {
        const firstResult = firstArray[i]
        const secondResult = secondArray[i]

        if (await comparer(firstResult, secondResult) === false) {
            return false
        }
    }

    return true
}
